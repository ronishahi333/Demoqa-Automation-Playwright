---
name: test-structure
description: Conventions for this DemoQA Playwright/TypeScript repo — how Page Objects, spec files, fixtures, and data-driven tests are structured. Use whenever adding/editing a page object (src/pages/*.pom.ts), a spec (tests/*.spec.ts), or test data, so new code matches the existing pattern instead of inventing a new one.
---

# DemoQA Playwright test structure

This repo automates https://demoqa.com/ with Playwright + TypeScript, using a
Page Object Model (POM). There is one POM class per demoqa page/widget and one
spec file per POM, wired together with Playwright fixtures (not `new Pom(page)`
inside the test body).

## Directory layout

```
src/pages/<name>.pom.ts   # one POM class per demoqa page/widget
tests/<name>.spec.ts      # one spec file per POM (usually 1:1 name match)
test-data/                # JSON/CSV fixtures + binary files used by uploads
playwright.config.ts      # baseURL, reporters, trace/video/screenshot policy
eslint.config.mjs         # style rules enforced via `npm run lint`
.github/workflows/        # CI: runs practiceform.spec.ts on chromium, publishes Allure
```

## Page Object (`src/pages/*.pom.ts`) shape

Every POM follows this exact skeleton — copy it rather than improvising a new
shape:

```ts
import { Locator, Page, expect } from '@playwright/test';

export class Widgetname {
  readonly page: Page;
  readonly element: {
    someButton: Locator,
    someInput: Locator
  };

  constructor(page) {
    this.page = page;
    this.element = {
      someButton: page.getByRole('button', { name: 'Submit' }),
      someInput: page.getByPlaceholder('First name')
    };
  }

  navigate() {
    return this.page.goto('/widget-path');
  }

  async doThing(value: string) {
    await this.element.someInput.fill(value);
    await this.element.someButton.click();
  }

  async assertThing(value: string) {
    const result = this.page.locator('#result');
    await expect(result).toContainText(value);
  }
}
```

Rules observed across all 13 POMs:
- Class name is a **capitalized** version of the file's subject (`Checkbox`,
  `Dropdown`, `Webtables`, `Browserwindows`, `DragObject`) — not always
  identical casing to the filename.
- Locators are declared once, as a typed `readonly element` (or `elements`,
  both names are used — pick one per file, don't mix within a file) object
  built in the constructor. Never re-query a locator inline in an action
  method if it's used more than once; add it to the map. One-off assertion
  locators (e.g. a result `<p>`/`<span>` looked up only inside a single
  `assert*` method) are the one exception and are declared locally in that
  method — see `textbox.pom.ts` `assertForm`.
- `navigate()` is synchronous-looking but returns the `page.goto()` promise
  (`return this.page.goto('/path')`), it is **not** `async`.
- Prefer role/placeholder/label locators (`getByRole`, `getByPlaceholder`,
  `getByLabel`, `getByText`) over raw CSS/`#id` locators; fall back to
  `page.locator('#id')` only when demoqa has no accessible name (common on
  DemoQA's checkbox tree and custom widgets).
- Action methods are `async`, named as a verb phrase (`checkButton`,
  `clickAddButton`, `hoverToButton`, `dragToPlace`). When a method exists
  specifically to be reused inside the combined practice-form flow, suffix it
  `...PracticeForm` (e.g. `radioPracticeForm`, `checkboxPracticeForm`,
  `dropdownPracticeForm`, `imageUploadPracticeForm`, `datePracticeForm`) so
  it's clear it's the practice-form variant of the widget's interaction.
  Trivial pages with nothing to assert (`Iframes`, `Practiceform`) only
  implement `navigate()`.
- Assertions that belong to the widget's own behavior live in the POM as
  `assert*` methods using `expect` imported from `@playwright/test`.
  Assertions that are specific to one test's expected value stay in the spec
  file instead (see `iframes.spec.ts`, `dragobject.spec.ts`).
- File uploads resolve paths with
  `path.resolve(__dirname, '../../test-data/<file>')` — always relative to the
  POM file location, never a hardcoded absolute path.

## Spec (`tests/*.spec.ts`) shape

Every spec wires its POM(s) in via a fixture, not a manual `new`:

```ts
import { test as base } from '@playwright/test';
import { Widgetname } from '../src/pages/widgetname.pom';

const test = base.extend<{
    widgetname: Widgetname
}>({
  widgetname: ({ page }, use) => use(new Widgetname(page))
});

test('Interacting with Widgetname', async({ widgetname }) => {
  await widgetname.navigate();
  await widgetname.doThing('some value');
});
```

- Always `import { test as base } from '@playwright/test'`, then
  `base.extend<{...}>({...})` and export the extended `test` as the local
  `test` used in the file. Import `expect` from `@playwright/test` alongside
  `test as base` only when the spec needs its own assertions.
- Fixture key is the **lowerCamelCase** of the class name (`webtables`,
  `dragobject`, `browserwindow`), and the fixture factory is always the
  one-liner `({ page }, use) => use(new ClassName(page))`.
- When a test needs several widgets together (see `practiceform.spec.ts`),
  extend with all of them in one `base.extend<{...}>({...})` block and
  destructure all needed fixtures in the test callback — don't create
  separate `test()` blocks per widget for a single end-to-end flow.
- Test titles are human-readable sentences: `'Interacting with Checkbox'`,
  `'Filling up the practice form'` — not spec-style `it_should_...` names.
- Static test input values (names, emails, addresses) are declared as
  top-level `const`s directly above the `test(...)` call, not inline literals
  scattered through the test body.
- Browser dialogs (`alert`/`confirm`/`prompt`) are handled by registering
  `page.on('dialog', async(alert) => {...})` **before** triggering the action
  that opens them, then asserting `alert.message()` and calling
  `alert.accept()` / `alert.dismiss()` inside that handler — see
  `alerts.spec.ts`.
- Popups/new tabs are captured with
  `Promise.all([page.waitForEvent('popup'), trigger.click()])` inside the POM
  method, not the spec — see `browserwindows.pom.ts`.

## Data-driven tests

Two supported patterns, both iterating over `test-data/`:

1. **JSON** (`JsonDDT.spec.ts`): `import collection from '../test-data/testdata.json'`
   then `for (const data of collection) { test(\`...${data.fullName}\`, ...) }`.
2. **CSV** (`CSVDDT.spec.ts`): read with `fs.readFileSync` + `parse` from
   `csv-parse/sync` into a typed `interface CSVRecord`, then loop the same way.

In both, the fixture setup (`base.extend`) is declared once outside the loop,
and each generated test's title interpolates the row's identifying field
(e.g. `` `Submitting the form of - ${record.Name}` ``) so failures are
individually identifiable in the report.

## Config & tooling

- `playwright.config.ts`: `testDir: './tests'`, `baseURL: 'https://demoqa.com/'`
  (so POMs call `page.goto('/relative-path')`), `workers: 1`,
  `fullyParallel: true`, CI-only retries (`retries: 2`), `slowMo: 200`,
  `trace/screenshot/video: retain/only-on-failure`. Reporters: `html`, `list`,
  and `allure-playwright`.
- `eslint.config.mjs` enforces: mandatory semicolons, 2-space indent, no
  trailing spaces, `space-before-function-paren: never`
  (`function()` not `function ()`), always-spaced object braces
  (`{ foo: bar }`). Run `npm run lint` before considering new POM/spec code
  done.
- Reporting is Allure-based: `npm run allure` (local: copy history, generate,
  open), `npm run allure-clean` (wipe `allure-results/`) before a fresh local
  run if you don't want old runs bleeding into the trend graphs.

## CI

`.github/workflows/playwright.yml` triggers on push to `main`/`master` and
currently runs **only** `practiceform.spec.ts` on the `chromium` project
(`npx playwright test practiceform.spec.ts --project='chromium'`), then
publishes the Allure report to the `allure-report` branch on GitHub Pages
regardless of pass/fail. If you add a new spec that should run in CI, it must
be added explicitly to that `npx playwright test` command — new spec files
are not picked up automatically.

## Checklist for adding a new widget

1. Create `src/pages/<name>.pom.ts` following the POM skeleton above.
2. Create `tests/<name>.spec.ts` with a `base.extend` fixture and one
   `test(...)` calling `navigate()` then the action/assert methods.
3. If the widget also appears on `/automation-practice-form`, add a
   `...PracticeForm()` method to the POM and wire the new fixture into
   `tests/practiceform.spec.ts`'s `base.extend` + test body.
4. Run `npm run lint` and `npx playwright test <name>.spec.ts` locally before
   considering it done.
