# Playwright TypeScript Automation Framework

A Page Object Model test framework for [Automation Exercise](https://automationexercise.com), built with Playwright Test and TypeScript. It includes reusable fixtures, data-driven tests, network interception, accessibility scans, visual snapshots, failure screenshots, retry traces, and failure-retained videos.

## Requirements

- Node.js 22.12 or newer stable release (use an LTS version; avoid pre-release builds)
- npm
- Playwright browser binaries for Chromium, Firefox, and WebKit

## Install

```bash
npm ci
npx playwright install
```

The tests use the live public practice website and create uniquely named accounts for registration, login, and checkout scenarios. The payment details are dummy practice data; no real payment is made.
Tests run sequentially by default to avoid overloading the public demo site's limited capacity.

## Run tests

```bash
npm test
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:headed
npm run test:ui
```

To select one scenario, use a Playwright title filter:

```bash
npx playwright test -g "product search returns Blue Top"
```

`BASE_URL` can override the default website URL, for example:

```powershell
$env:BASE_URL = "https://automationexercise.com"
npm test
```

## Visual regression

Visual snapshots of the stable home-page header are maintained on Chromium. Create or intentionally update the baseline with the update command, then review and commit the resulting image before relying on future comparisons:

```bash
npm run test:visual:update
npm run test:visual
```

Snapshot differences are included in the Playwright test results. Keep baselines updated intentionally when the expected UI changes.

## Accessibility

The accessibility spec runs axe-core against the home page with WCAG 2.0/2.1 A/AA tags. It fails on detected violations so that accessibility regressions are visible; the live practice site may currently have violations that need to be fixed upstream.

## Diagnostics and reports

- HTML report: `reports/html/` (`npm run report`)
- Test output, screenshots, traces, and videos: `test-results/`
- Trace viewer: `npx playwright show-trace <path-to-trace.zip>`
- Failure screenshots are attached to the test result and written to the test's output directory.
- Videos and traces are retained for failed tests; traces are also collected on the first retry.

## Project layout

```text
config/       Shared runtime configuration
fixtures/     Playwright fixtures and page object initialization
pages/        Page Object Model classes
reports/      Generated HTML report output
testdata/     JSON data for users, products, contact, and checkout
tests/        Authentication, product, checkout, contact, accessibility, visual, and mock specs
utils/        Logging, screenshot capture, and JSON data reader
```

## Test coverage

- Account registration, login, and logout
- Data-driven product search
- Adding/removing products in the cart
- Authenticated checkout and order placement
- Contact us form submission
- axe accessibility scan
- Chromium visual regression baseline
- Route-based network mocking example
