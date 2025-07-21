# Denzing Automation
This repository contains automated tests for the Denzing using Playwright and Typescript

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)  
- npm or yarn package manager

### Step 1: Clone the Repository  
Open a terminal or command prompt and run the following command to clone the project repository to your local machine:

## Step 2: Install Project Dependencies
Run the following command to install the required dependencies for the project, including Playwright and any other necessary libraries:

"npm install"

## Step 3: Install Playwright Browsers
After the dependencies are installed, you'll need to install the necessary browsers (Chromium, Firefox, WebKit) for Playwright:

"npx playwright install"

## Step 4: Install Additional Dependencies (For Mac and Linux Users only)

"npx playwright install-deps" 

## Step 5: Run the Tests
Once everything is installed, you can run the tests using the following command:

"npx playwright test"

## Step 6: View the Results
After running the tests, you will see the results in the terminal. If all tests pass, you will see a success message. If any tests fail, Playwright will provide detailed error messages to help you debug the issue.

## Step 7: Generate Report 
Since Playwright has inbuilt report system, To generate the report you can run the following command after the tests has been completed 

"npx playwright show-report"
