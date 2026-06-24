# Demoqa Automation
This repository contains end-to-end automation test scripts developed using Playwright for https://demoqa.com. It is designed to validate application functionality, improve test coverage, and support regression testing across different browsers.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)  
- npm or yarn package manager

## Clone Repository

Clone the repository to your local machine and navigate to the project directory.

```bash
git clone <repository-url>
cd <repository-name>
```

## Install Dependencies

Install all required project dependencies defined in the `package.json` file.

```bash
npm install
```

## Install Playwright Browsers

Download and install the browser binaries required by Playwright to execute tests.

```bash
npx playwright install
```

## Run Tests

Execute all automated test cases available in the project.

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test <test-file-name>
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

## View Test Report

Open the Playwright HTML report to review test execution results, screenshots, traces, and logs.

```bash
npx playwright show-report
```

- Cleaning the allure-results folder is required, if you don't want the older tests report to generates

"npm run allure-clean"
