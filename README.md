# Coffee Cart Automated Tests

UI tests for [Coffee Cart](https://coffee-cart.app/) using Playwright and TypeScript. The suite runs in Chromium, Firefox, and WebKit.

## Coverage

- Product selection, checkout, payment details, and purchase confirmation.
- Accepting and rejecting promotions, including repeated offers, cart totals, and checkout.
- Right-click add-to-cart confirmation and cancellation.
- Double-click translation of the Mocha title to Chinese.

## Run

Requires Node.js 24 and npm. From the project directory:

```bash
npm ci
npx playwright install
npx playwright test
```

On Linux, use `npx playwright install --with-deps` to include browser system dependencies. Tests require internet access.

## Structure

```text
pages/       Page objects and locators
fixtures/    Setup and initial state checks
data/        Test inputs and expected values
tests/       Scenarios and assertions
```

Each test starts with an empty cart in an isolated browser context. Tests use Playwright locators and auto-waiting.

## Reports

```bash
npx playwright show-report
```

The HTML report contains results, steps, and screenshots. Traces are retained for failed tests. Generated reports are stored in `playwright-report/` and artifacts in `test-results/`; both are excluded from Git.

## GitHub Actions

The [workflow](.github/workflows/playwright.yml) runs on pushes and pull requests to `main` or `master`. It installs dependencies, executes the suite, and uploads the HTML report for 30 days. Download the report from the run's artifacts in the Actions tab.
