# ERPNext UI Test Automation Framework

A UI test automation framework developed using **Playwright, TypeScript, and the Page Object Model (POM)** to test business workflows in ERPNext v16.

The project focuses on automating ERPNext business workflows, including authentication, record creation, form validation, stock operations, and sales transactions. It follows the Page Object Model (POM) design pattern to keep test cases organized and reusable.

## Tech Stack

- **Playwright** — Browser automation and test execution
- **TypeScript** — Test scripts and framework development
- **Page Object Model (POM)** — Separation of page interactions and test scenarios
- **Docker** — Local ERPNext v16 test environment
- **Git & GitHub** — Version control
- **VS Code** — Development environment

## Test Coverage

The framework includes automated UI tests across eight ERPNext modules.

| Module | Test Coverage |
|---|---|
| Authentication | Valid and invalid login, mandatory fields, session handling, logout |
| Customer | Customer creation, field validation, search, saved-record verification |
| Item | Item creation, mandatory fields, and record validation |
| Stock | Stock reports, warehouse operations, and stock transactions |
| Sales Order | Sales order creation, validation, and document workflows |
| Delivery Note | Delivery note creation, field verification, and draft saving |
| Sales Invoice | Invoice creation, field validation, and draft workflows |
| Payment Entry | Payment processing and related invoice workflows |

## Framework Architecture

The project follows the Page Object Model design pattern to keep test cases readable and page interactions reusable.

**BasePage (`base.ts`)**

Contains common ERPNext functionality such as navigation, reusable page actions, buttons, and modal handling.

**GridHelper (`gridHelper.ts`)**

Handles reusable ERPNext transaction-grid operations, including item selection, warehouse selection, quantities, and rates.

**Page Object Classes**

Each module has its own page object containing relevant locators and business actions.

**Fixtures**

Provide reusable page object instances for test cases.

**Test Specifications**

Contain test scenarios, assertions, and expected outcomes.

## Project Structure

```text
ERPNext-Automation-Project/
│
├── data/
│   └── users.example.ts
│
├── fixtures/
│
├── pages/
│   ├── base.ts
│   ├── gridHelper.ts
│   ├── login.ts
│   ├── customer.ts
│   ├── items.ts
│   ├── stock.ts
│   ├── sales.ts
│   ├── deliverynote.ts
│   ├── salesInvoice.ts
│   └── payment.ts
│
├── tests/
│   ├── login.spec.ts
│   ├── customer.spec.ts
│   ├── items.spec.ts
│   ├── stock.spec.ts
│   ├── sales.spec.ts
│   ├── deliverynote.spec.ts
│   ├── salesInvoice.spec.ts
│   └── payment.spec.ts
│
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.ts
```

## Prerequisites

- Node.js and npm
- ERPNext v16 running locally
- Playwright browser dependencies
- Valid test-user credentials

The framework was developed against a local ERPNext instance running at:

`http://localhost:8080`

## Installation and Setup

**1. Clone the repository**

```bash
git clone https://github.com/hiradevqa/ERPNext-Automation-Project.git
cd ERPNext-Automation-Project
```

**2. Install dependencies**

```bash
npm install
```

**3. Install Playwright browsers**

```bash
npx playwright install
```

**4. Configure test credentials**

Copy `data/users.example.ts` to `data/users.ts` and replace the example values with credentials for your local ERPNext test environment.


**5. Start ERPNext**

Ensure the local ERPNext application is running and accessible before executing the tests.

## Running Tests

**Run all tests**

```bash
npx playwright test
```

**Run tests using a single worker**

```bash
npx playwright test --workers=1
```

**Run a specific module**

```bash
npx playwright test tests/customer.spec.ts --workers=1
```

**Run tests with the browser visible**

```bash
npx playwright test --headed --workers=1
```

**Run tests three times to check stability**

```bash
npx playwright test --workers=1 --repeat-each=3
```

**Generate and view the HTML report**

```bash
npx playwright show-report
```

## Automation Approach

The framework uses:

- Container-scoped locators for ERPNext pages and forms
- Reusable Page Object methods
- Shared navigation and common actions through `BasePage`
- Dedicated transaction-grid operations through `GridHelper`
- Playwright assertions for UI and data verification
- Dynamic test data where required to avoid duplicate records
- Positive and negative functional test scenarios
- Single-worker execution for workflows using shared ERPNext test data

## Browser Support

Playwright supports execution on Chromium, Firefox, and WebKit.

Browser execution depends on the projects configured in `playwright.config.ts`.

## Project Focus

This project demonstrates practical UI automation skills, including:

- Translating functional requirements into automated test scenarios
- Designing and maintaining a reusable POM framework
- Automating ERP business processes across multiple modules
- Validating forms, records, and transaction states
- Working with dynamic elements, modals, dropdowns, and transaction grids
- Debugging and improving test reliability

## Future Improvements

- Expand end-to-end business workflow coverage
- Improve test data management and cleanup
- Introduce CI/CD execution and reporting
- Extend API automation coverage for ERPNext

## Disclaimer

This is an independent QA automation portfolio project developed for learning and testing purposes. It is not affiliated with or officially maintained by the ERPNext/Frappe team.

All automated tests are intended to run against a local test environment.
