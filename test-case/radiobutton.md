# Radio Button Test Plan

## Application Overview

The Radio Button widget (`https://demoqa.com/radio-button`) presents the question "Do you like the site?" with three radio options: "Yes", "Impressive", and "No". Selecting "Yes" or "Impressive" checks that option, unchecks any previously selected option, and reveals a confirmation paragraph reading "You have selected \<option\>", with the option name styled in green (`text-success`). The "No" option is permanently disabled and cannot be selected.

## Test Scenarios

### 1. Radio Button Selection

**Seed:** Navigate to `https://demoqa.com/radio-button`.

#### 1.1. check-radio-button-with-yes

**Preconditions:**
- Browser is open and navigated to `https://demoqa.com/radio-button`.
- No radio option is selected yet.

**Steps:**
1. Locate the "Yes" radio button under "Do you like the site?".
2. Click the "Yes" radio button.

**Expected Assertions:**
- The "Yes" radio button is checked.
- The "Impressive" radio button remains unchecked.
- A confirmation message "You have selected Yes" is displayed below the options.
- The word "Yes" in the confirmation message is styled as success text (green).

#### 1.2. check-radio-button-with-impressive

**Preconditions:**
- Browser is open and navigated to `https://demoqa.com/radio-button`.
- No radio option is selected yet.

**Steps:**
1. Locate the "Impressive" radio button under "Do you like the site?".
2. Click the "Impressive" radio button.

**Expected Assertions:**
- The "Impressive" radio button is checked.
- The "Yes" radio button remains unchecked.
- A confirmation message "You have selected Impressive" is displayed below the options.
- The word "Impressive" in the confirmation message is styled as success text (green).
