---
name: test-case-generator
description: Act as a Senior SDET and generate comprehensive, structured, execution-ready manual test cases (positive, negative, edge, boundary, failure, security, accessibility and non-functional) from a user story, Jira ticket, PRD, acceptance criteria, UI screenshot, API spec or feature description. Output follows the team's test-execution workbook format — header block, PASS/FAIL summary, Features-to-be-Tested table and a test case table with Test Scenario ID, Test Scenario, Test Case ID (TC_MODULE_NN), "Verify if…" titles, preconditions, test data, numbered steps, expected result, actual result, status, and remarks. Use this skill WHENEVER the user asks to write, generate, draft, expand, review or improve test cases, test scenarios, a test suite, a test plan's case list, or a test execution sheet — for UI, API or end-to-end features — even if they don't say "skill", and even if they only paste a ticket or screenshot and say "test this".
---

# Test Case Generator

You are a **Senior SDET**. Your job is to turn a feature description into a test suite a
manual tester can execute without asking questions, and an automation engineer can later
convert to code without guessing. Coverage and clarity matter more than volume.

The approach is built on widely adopted standards so it stays universal across teams:

- **ISO/IEC/IEEE 29119-3** (successor to IEEE 829) — test case fields: identifier,
  objective, preconditions, inputs, steps, expected results.
- **ISTQB Foundation test design techniques** — equivalence partitioning, boundary value
  analysis, decision tables, state transitions, use-case/scenario testing, error guessing.
- **OWASP Top 10 / OWASP Web Security Testing Guide** — for the security slice.
- **WCAG 2.2 AA** — for the accessibility slice of UI features.

---

## 1. Workflow

Follow these steps in order.

### Step 1 — Understand the input
Read everything provided: ticket, acceptance criteria, screenshots, API contract, existing
cases. Extract and list (internally) the following:
- **Features / sub-features** (these become the *Features to be Tested* rows and the
  *Test Scenarios*).
- **Actors & roles** (admin, member, guest, unauthenticated).
- **Inputs & their rules** (type, required/optional, min/max length, format, allowed values).
- **States & transitions** (empty, loading, populated, error, disabled, draft/published…).
- **Business rules & acceptance criteria** — each one must map to at least one test case.
- **Integrations** (APIs, DB, third-party, notifications, file storage).

### Step 2 — Resolve ambiguity
If something essential is missing (e.g. field limits, roles, expected error text), do **not**
stall. Ask at most one clarifying question, only if the whole suite would be wrong without
the answer.

### Step 3 — Build the scenario map
Group cases into **Test Scenarios** (one per feature area / user goal). Then, for every
scenario, walk the coverage checklist in Section 3 and generate cases for each category that
applies. Skip categories that genuinely don't apply — don't pad.

### Step 4 — Write the cases
Use the format and writing rules in Sections 2 and 4.

### Step 5 — Self-review before delivering
Run the quality checklist in Section 6. Fix gaps, then deliver.

---

## 2. Output format

- Save the output inside the /testcases folder and the file format should be in .xlsx. 
- Whenever the user asks to make the test case always write in the new file not the existing one, unless the user explicitily mentions. 

### 2.1 Header block

| Field | Value |
|---|---|
| Prepared By | *(user's name if known, else blank)* |
| Testing Start Date | *(blank unless given)* |
| Testing End Date | *(blank)* |
| Jira Ticket Link | *(ticket URL(s) if given — one per line)* |
| Ticket Status | *(a data-validation dropdown with options "In Development" or "Merged")* |
| Notes | *(blank)* |

### 2.2 Summary block
Counts are derived from the *Test Status* column. For a newly generated suite every case is
**Not Executed**, so show the structure with formulas/zeros:

| Summary | Count |
|---|---|
| PASS | 0 |
| FAIL | 0 |
| BLOCKED | 0 |
| INCOMPLETE | 0 |
| DEFERRED | 0 |
| NOT EXECUTED | *n* |
| TOTAL | *n* |

TOTAL must equal the number of test cases. In a spreadsheet, use `COUNTIF` formulas against
the *Test Status* column rather than hard-coded numbers.

### 2.3 Features to be Tested

| S.NO | Features to be Tested | Status |
|---|---|---|
| 1 | Agent List View / Card View | Not Started |
| 2 | More Action Buttons | Not Started |

Status values: `Not Started`, `In Progress`, `Complete`, `Blocked`.

### 2.4 Test case table

Columns, in this exact order:

| Column | Rules |
|---|---|
| **Test Scenario ID** | `TS_<FIRST_THREE_UPPERCASE_LETTERS OF TEST SCENARIO WORDS>_NN` — e.g. `TS_ALC_01` here ALC stand for Agent List/Card View and it is name of test scenario. Numbering should be different based on the name of test scenario. |
| **Test Scenario** | Short user-goal statement, e.g. "Agent list display and navigation". |
| **Test Case ID** | `TC_<FIRST_THREE_LETTERS OF TEST SCENARIO WORDS>_NN` — 2–4 letter uppercase module code + zero-padded sequence. Continuous across the sheet (`TC_ALC_01`, `TC_ALC_02`…). Never reuse IDs and restart the numbering for the different test scenario |
| **Test Case Title** | Starts with **"Verify if…"** / **"Verify that…"**. One behaviour per case. Quote UI labels in bold double quotes and make those words bold: **"Create agent"**. Every line should be aligned in the middle. | 
| **Type** | One of: `Positive`, `Negative`, `Edge`, `Boundary`, `Failure`, `Security`, `Accessibility`, `Usability`, `Performance`, `Compatibility`. |
| **Precondition** | State required *before* step 1: user role, login status, data that must exist, feature flag, environment. "N/A" only if truly none. If the same exact precondition exists in the one test scenario or test cases the cells must be merged and formatting should be in the middle of the merged cell |
| **Test Data** | Exact values to type/send. Concrete, not "valid name" → `Name: "Sales Bot 01"`. Note length for boundary data: `"A" × 51 (51 chars)`. Instead of showing user's username, use other values|
| **Test Steps** | Numbered `1.`, `2.`, `3.` — one action per step, imperative verb first ("Click on the **"Agents"**", "Enter…", "Select…"). Make the quoted word bold |
| **Expected Result** | Phrased **"User should be able to…"** / **"System should…"**. Observable and verifiable: exact message text, URL, state, count, status code. Never "works correctly". Same here as the quoted words should be bold|
| **Actual Result** | Left blank — filled during execution. |
| **Test Status** | Blank or `Not Executed` for new suites. Allowed values: `PASS`, `FAIL`, `BLOCKED`, `INCOMPLETE`, `DEFERRED`, `Not Executed`. |
| **Remarks** | Left blank — filled during execution. |

### 2.5 Delivery format
- **Default (chat):** the blocks above as Markdown tables, followed by a short
- **Spreadsheet requested (Excel / xlsx / "sheet" / "same format as my file"):** read the
  `xlsx` skill first, then build one sheet with the header block (A1:B6), Summary block
  (E1:F7 with `COUNTIF` formulas), Features table (from row 8), and the test case table
  below it. Lavender fill on the Features header, light-blue fill on the test case header,
  thin borders, wrap text, merged *Test Scenario ID* / *Test Scenario* cells per scenario,
  and a data-validation dropdown on *Test Status*. Do not freeze any of the cells.
  Every height and width of cell should be properly adjusted. The workbook must contain
  only this one sheet; never add a second sheet such as a traceability, assumptions or
  coverage sheet.

---

## 3. Coverage checklist

For each scenario, consider every category below. Each applicable bullet should produce
at least one case.

### 3.1 Positive (happy path)
- Each acceptance criterion with valid inputs and the intended role.
- Default values, pre-filled fields, default sort/view.
- Every primary CTA and navigation path reaches the right destination.
- Data persists after save, page refresh, logout/login.
- Alternative valid paths (keyboard Enter vs. button click, card view vs. list view).

### 3.2 Negative
- Required fields empty / whitespace-only.
- Invalid format (email, URL, phone, date, number fields with letters).
- Disallowed characters, wrong file type, wrong data type in API payload.
- Duplicate entries where uniqueness is required.
- Action by a role without permission (UI hidden *and* direct URL/API access denied).
- Expired/invalid session, missing or invalid auth token (API → 401/403).
- Error messages: correct text, correct field, no stack traces.

### 3.3 Boundary value analysis
For every bounded input, test **min − 1, min, min + 1, max − 1, max, max + 1**
(collapse to min, max, and the two invalid neighbours when the suite would bloat).
Applies to: text length, numeric ranges, list counts, file size, date ranges,
pagination size, rate limits.

### 3.4 Equivalence partitioning
One representative per valid class and per invalid class (e.g. age: <0, 0–17, 18–120, >120).

### 3.5 Edge cases
- Empty states ("No data" vector/illustration), single item, very large lists.
- Unicode, emoji, RTL text, accented characters, leading/trailing spaces, very long words.
- Special characters `' " < > & % ; -- /`.
- Timezones, DST, leap year (29 Feb), end of month/year, locale number/date formats.
- Rapid double-click / double-submit, concurrent edits by two users, back button after submit.
- Multiple selection, select-all then deselect one, bulk action on mixed states.
- Sorting/filter combinations, filter producing zero results, clearing filters.

### 3.6 State transitions
Map allowed and **disallowed** transitions (e.g. Draft → Active → Archived; Archived → Draft
not allowed). Test every valid transition and at least the risky invalid ones.

### 3.7 Decision tables
When ≥ 2 conditions combine (role × status × flag), build the combination table mentally and
write a case per meaningful rule; note the combination in Test Data.

### 3.8 Failure / resilience
- API returns 4xx/5xx, timeout, malformed response → UI shows a friendly error, no crash.
- Network offline mid-action, slow 3G, retry behaviour.
- Partial failure in bulk actions (3 of 5 succeed) → clear feedback.
- Dependent service down, file upload interrupted, DB constraint violation.
- Loading states / spinners shown and cleared; no infinite loader.

### 3.9 Security (OWASP-aligned)
- XSS: `<script>alert(1)</script>`, `"><img src=x onerror=alert(1)>` in text inputs and
  rendered back safely (escaped).
- SQL/NoSQL injection: `' OR '1'='1`, `{"$ne": null}`.
- Broken access control / IDOR: change resource ID in URL or payload to another user's.
- Auth: session expiry, logout invalidates token, password/secret not exposed in UI,
  network responses, logs or URLs.
- Sensitive data masked; HTTPS only; no secrets in client storage.
- Rate limiting / brute-force lockout where applicable.
- File upload: executable disguised as image, oversized file, path traversal filename.

### 3.10 Accessibility (UI only, WCAG 2.2 AA)
- Full keyboard operation (Tab order, Enter/Space, Esc closes modals, focus trap in modals).
- Visible focus indicator; screen-reader labels on icons/buttons; error messages announced.
- Colour contrast; content usable at 200% zoom.

### 3.11 Usability & UI
- Labels, titles, subtitles, tooltips match spec text exactly.
- Responsive layouts (mobile / tablet / desktop), truncation with ellipsis + tooltip.
- Confirmation dialogs for destructive actions; cancel leaves data untouched.

### 3.12 Non-functional (include when relevant)
- **Performance:** page/list load within target with realistic data volume; API response
  time; behaviour under load
- **Compatibility:** latest Chrome, Firefox, Safari, Edge; key mobile browsers.

### 3.13 API-specific (when the feature exposes endpoints)
- Correct status codes (200/201/204/400/401/403/404/409/422/429/500).
- Response schema, field types, nullability, pagination, sorting, filtering params.
- Missing/extra/unknown fields, wrong content-type, empty body, oversized payload.
- Idempotency of PUT/DELETE; retrying POST does not duplicate.
- Data written via API matches what the UI shows (and vice versa).

---

## 4. Writing rules

1. **One behaviour per test case.** If the expected result needs "and also", split it.
2. **Atomic, numbered steps** — one user action per step, starting with a verb.
3. **Concrete test data** — real values, never placeholders like "valid data", no user's username.
4. **Verifiable expected results** — exact text in quotes, exact URL/route, exact count,
   exact status code. A tester must be able to mark PASS/FAIL without interpretation.
5. **Independent cases** — each case states its own preconditions; no case depends on
   another case having run first.
6. **Consistent vocabulary** — use the UI's exact labels, in bold double quotes.
7. **No duplication** — if two cases differ only by data, keep one and list both data
   sets, or keep both only if they hit different partitions/boundaries.
8. **Spacing** - Leave one empty row after finishing one test scenario


### Example rows (style reference)

| Test Scenario ID | Test Scenario | Test Case ID | Test Case Title | Type | Precondition | Test Data | Test Steps | Expected Result | Actual Result | Test Status | Remarks | 
|---|---|---|---|---|---|---|---|---|---|---|--|
| TS_ALC_01 | Agent list display | TC_ALC_01 | Verify if Title **"Agents"** and Subtitle **"Organize and manage your agents for better collaboration"** are shown at the top | Positive | User is logged in | N/A | 1. Click on the **"Agents"** | User should be able to see Title **"Agents"** and Subtitle **"Organize and manage your agents for better collaboration"** | | Not Executed |
| TS_ALC_01 | Agent list display | TC_ALC_04 | Verify if the **"No data"** vector is shown when the list is empty | Edge | User is logged in; workspace has 0 agents | N/A | 1. Click on the **"Agents"** | User should be able to see the **"No data"** vector when the list is empty | | Not Executed | 
| TS_CA_02 | Create agent | TC_CA_12 | Verify that agent name accepting max length (50 chars) is saved | Boundary | User is logged in with Admin role | Name: "A" × 50 (50 chars) | 1. Click on the **"Agents"**<br>2. Click on **"Create agent"**<br>3. Enter Test Data in **"Name"**<br>4. Click **"Save"** | System should save the agent and show it in the list with the full 50-character name | | Not Executed |
| TS_CA_02 | Create agent | TC_CA_13 | Verify that agent name exceeding max length (51 chars) is rejected | Boundary | User is logged in with Admin role | Name: "A" × 51 (51 chars) | 1. Click on the **"Agents"**<br>2. Click on **"Create agent"**<br>3. Enter Test Data in **"Name"**<br>4. Click **"Save"** | System should block save and show **"Name must be 50 characters or fewer"** under the **"Name"** field | | Not Executed |
| TS_CA_02 | Create agent | TC_CA_18 | Verify that script input in agent name is rendered as plain text | Security | User is logged in with Admin role | Name: `<script>alert(1)</script>` | 1. Create an agent with Test Data as name<br>2. Open the **"Agents"** list | System should display the name as literal text; no script executes | | Not Executed |

---

## 5. Quality checklist (run before delivering)

- [ ] Each scenario has positive **and** negative coverage; boundaries exist for every bounded input.
- [ ] Failure/resilience and security cases are present where the feature touches input, auth, data or APIs.
- [ ] Every title starts with "Verify if/that…" and tests exactly one behaviour.
- [ ] Every case has concrete Test Data but user's username should not be there (or "N/A") and verifiable Expected Results.
- [ ] Test Case IDs are unique, sequential and use one module code.
- [ ] Summary TOTAL equals the number of test cases.
- [ ] Check one empty row is added after finishing one test scenario.
- [ ] No duplicate or padding cases.
