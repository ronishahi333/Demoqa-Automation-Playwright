# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Playwright + TypeScript end-to-end test suite automating https://demoqa.com/, using a Page Object Model (POM). One POM class per demoqa widget lives in `src/pages/`, one spec file per POM lives in `tests/`.

## Commands

```bash
npm install                      # install dependencies
npx playwright install           # install browsers (first-time setup)
npx playwright install-deps      # Linux/Mac only, install OS-level deps

npx playwright test                          # run the full suite (chromium + firefox)
npx playwright test tests/textbox.spec.ts    # run a single spec file
npx playwright test -g "Interacting with Checkbox"  # run a single test by title
npx playwright test --project=chromium       # run against one browser only

npm run lint                     # eslint over .ts/.tsx/.js/.jsx

npx playwright show-report       # open the built-in HTML report after a run
npm run allure                   # generate + open the Allure report locally
npm run allure-clean             # wipe allure-results/ before a fresh local run
```

There is no build step — tests run directly via `ts-node`-style Playwright transform, and there is no unit test runner in this repo (Playwright specs are the only tests).

## Architecture

### Page Object Model convention

Every file in `src/pages/*.pom.ts` follows the same shape:

```ts
export class Widgetname {
  readonly page: Page;
  readonly element: { someButton: Locator, someInput: Locator };

  constructor(page) {
    this.page = page;
    this.element = { someButton: page.getByRole('button', { name: 'Submit' }), ... };
  }

  navigate() { return this.page.goto('/widget-path'); }   // not async, returns the goto promise
  async doThing(value: string) { ... }                    // action methods
  async assertThing(value: string) { ... }                // widget-owned assertions, using expect
}
```

- Locators are declared once in the constructor as a typed `element`/`elements` map (name varies per file, but never mixed within one file) — don't re-query the same locator inline more than once.
- Prefer role/placeholder/label locators (`getByRole`, `getByPlaceholder`, `getByLabel`, `getByText`) over raw `#id` CSS; fall back to `page.locator('#id')` only where demoqa has no accessible name (its checkbox tree and some custom widgets).
- Methods that exist specifically to be reused inside the combined automation-practice-form flow are suffixed `...PracticeForm` (e.g. `radioPracticeForm`, `checkboxPracticeForm`, `dropdownPracticeForm`, `imageUploadPracticeForm`, `datePracticeForm`).
- File uploads resolve paths with `path.resolve(__dirname, '../../test-data/<file>')`, relative to the POM file.

### Spec file convention

Every file in `tests/*.spec.ts` wires its POM(s) in via a Playwright fixture rather than `new Pom(page)` inline:

```ts
const test = base.extend<{ widgetname: Widgetname }>({
  widgetname: ({ page }, use) => use(new Widgetname(page))
});

test('Interacting with Widgetname', async({ widgetname }) => {
  await widgetname.navigate();
  await widgetname.doThing('some value');
});
```

- Fixture key is the lowerCamelCase of the class name.
- `tests/practiceform.spec.ts` composes many POM fixtures (`Element`, `Radiobutton`, `Date`, `Checkbox`, `Uploadfile`, `Dropdown`, etc.) in one `base.extend` block to drive the full automation-practice-form flow end-to-end — this is the pattern to follow when a widget also appears on that combined form.
- Dialogs (`alert`/`confirm`/`prompt`) are handled by registering `page.on('dialog', ...)` before triggering the action that opens them (see `tests/alerts.spec.ts`).
- Popups/new tabs are captured inside the POM method with `Promise.all([page.waitForEvent('popup'), trigger.click()])` (see `src/pages/browserwindows.pom.ts`), not in the spec.

### Data-driven tests

Two patterns, both under `tests/`:
- `JsonDDT.spec.ts` — `import collection from '../test-data/testdata.json'`, then `for (const data of collection) { test(...) }`.
- `CSVDDT.spec.ts` — reads `test-data/testdata.csv` via `fs.readFileSync` + `parse` from `csv-parse/sync` into a typed record interface, then loops the same way.

In both, `base.extend` fixture setup happens once outside the loop, and each generated test title interpolates the row's identifying field.

### Config

- `playwright.config.ts`: `testDir: './tests'`, `baseURL: 'https://demoqa.com/'` (POMs call `page.goto('/relative-path')`), `workers: 1`, `fullyParallel: true`, CI-only retries, `slowMo: 200`, trace/screenshot/video captured `on-failure`. Reporters: `html`, `list`, `allure-playwright`.
- Chromium and Firefox projects are enabled; WebKit and mobile projects are present but commented out.

### CI

`.github/workflows/playwright.yml` triggers on push to `main`/`master` and runs **only** `practiceform.spec.ts` on the `chromium` project (`npx playwright test practiceform.spec.ts --project='chromium'`) — new spec files are not picked up automatically and must be added to that command explicitly. It then generates and publishes the Allure report to the `allure-report` branch on GitHub Pages regardless of pass/fail.

## Skills

`.claude/skills/test-structure/SKILL.md` has a more detailed writeup of these conventions with a checklist for adding a new widget (POM + spec + optional practice-form wiring) — consult it when creating new page objects or specs.
