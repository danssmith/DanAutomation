# OrangeHRM Automation

These automated tests are looking at the sign-in and leave management side of the open-source Human Resource Management website, OrangeHRM. I have automated the sign-in using positive, negative and edge case test scenarios, as well as the user being able to search for leave.

## Tech Stack

| Tools        | Purpose                                 |
|--------------|-----------------------------------------|
| TypeScript   | Programming language                    |
| Playwright   | Browser automation                      |
| Cucumber BDD | Test runner using Gherkin feature files |

## Prerequisites

- Node.js (version 18 or later)
- Git

## Setup

1. Clone the repository - git clone / cd DanAutomation
2. Install dependencies - npm install
3. Install the browser - npx playwright install chromium
4. Create an '.env' file in the root of the project with:
    BASE_URL=https://opensource-demo.orangehrmlive.com
    APP_USERNAME=Admin
    APP_PASSWORD=admin123

## Running Tests

npm test

## Test Scenarios

### Login Feature
- Successful login with valid credentials
- Failed login with invalid username
- Failed login with invalid password
- Failed login with invalid username and password
- Empty username and password validation
- Empty username with valid password validation
- Valid username with empty password validation

### Leave Search Feature
- User can search for leave records using the From Date and To Date date picker and confirm if results are returned
- Confirmation that "No Records Found" is displayed when no leave records exist

## Lessons Learned & Design Decisions

### Locator Strategy
When automating the empty field validation tests, I needed to verify that the "Required" text appeared under the correct input field. Online resources recommended using CSS class selectors to locate the element, however I felt this approach was risky as developers could change CSS class names at any time. Instead, I opted to navigate up from the input field using relative locators ("../../..") to find the parent container, then search for the "Required" text within it. This approach is tied to the page structure rather than styling, making it less at risk to future UI changes.

### Environment Variables
During development, I discovered that using `USERNAME` as an environment variable in the `.env` file caused a conflict on Windows, as Windows already has a system-level `USERNAME` variable set to the logged-in user's name. This meant the test was entering my Windows username instead of "Admin". I resolved this by renaming the variables to `APP_USERNAME` and `APP_PASSWORD` to avoid the collision. This taught me the importance of namespacing environment variables to prevent conflicts with system-level settings.

### Page Object Model
I separated all page interactions into dedicated page object files (`login.page.ts` and `leave.page.ts`) rather than putting element selectors directly in the test steps. This means if the OrangeHRM UI changes, I only need to update one file rather than every test that interacts with that page. It also keeps the step definition files clean and readable, with each step calling simple methods like `loginPage.login()` rather than containing raw Playwright commands.

### Browser Management
I created a shared `browser-manager.ts` utility to handle launching and closing the browser. Initially this logic lived inside the login step definitions, but when I added the Leave Search feature I would have needed to duplicate it.