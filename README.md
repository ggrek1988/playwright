# Test Automation training form jaktestowac.pl

## Links

-   course https://jaktestowac.pl/course/playwright-wprowadzenie/
-   test site
    https://demo-bank.vercel.app/  
    If link broken check first lesson for update:
    https://jaktestowac.pl/lesson/pw1s01l01/

## Commands

-   check `NodeJS` version  
    `node -v`
-   new project with Playwright:  
    `npm init playwright@latest`
-   record tests for given site  
    `npx playwright codegen https://demo-bank.vercel.app/`
-   run tests without browser GUI:  
    `npx playwright test`
-   run test with browser GUI:  
    `npx playwright test --headed`
-   viewing report  
    `npx playwright show-report`

## Playwright Config modifications

-   config file `playwright.config.ts`
-   disabling browsers, i.e. Firefox:
    ```json
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    ```

## Visual Studio Code

-   Preview: for README.md
-   Autosave: in File -> Auto Save
-   Timeline: file context menu -> Open Timeline
-   Formatting: editor -> context menu -> Format Document

## Playwright snippets

-   test:
    ```javascript
    test("test description", async ({ page }) => {});
    ```
-   describe:

    ```javascript
    describe("Group description", () => {});
    ```

-   running one test: `test.only`

## Locators

-   `getByTestId` i.e. `getByTestId('login-input')` for element with `data-testid="login-input"`
-   `getByRole` i.e. `getByRole('button', { name: 'wykonaj' })`
-   `locator` i.e. `locator('#some-id')` for element with attribute `id="some-id"`, `#some-id` is `css` selector

### Updating Playwright

-   check if Playwright should be updated  
    `npm outdated @playwright/test`
-   update Playwright  
    `npm i @playwright/test`
-   update browsers  
    `npx playwright install`
-   verify Playwright version  
    `npx @playwright/test --version`

## Chrome

-   open DevTools <kbd>F12</kbd> or right click `Inspect`
-   get selector: right click on element -> Copy -> Copy selector
-   testing CSS selectors in Console: `$$('selector')`
-   use English version!

### Prettier

-   install Prettier  
    `npm install --save-dev --save-exact prettier`
-   configure Prettier

    -   exlude files in `.prettierignore`

        ```
        package-lock.json
        playwright-report
        test-results

        ```

    -   set rules in `.prettierrc.json`
        ```
        {
            "singleQuote": true
        }
        ```

-   run Prettier  
    `npx prettier --write .`
-   additionaly you can install VSC extension: **Prettier**

### package.json example scripts

-   single command:  
    `"test": "npx playwright test",`
-   command with parameters:  
    `"test:headed": "npx playwright test --headed",`
-   other script with added parameters:  
    `"test:pulpit:hd" : "npm run test tests/pulpit.spec.ts -- --headed"`

Scripts can be run in standard and debug mode by:

-   hovering over script name and using opition **Run**
-   entering command `npm run script_name` i.e. `npm run test`
-   using `NPM Scripts` tab in **Explorer** view (need to be enabled in **EXPLORER** settings)

## Simple Page Object Model

Simple implementation of Page Object Model can be based on _classes_ that represents and implements tested pages.
Those calsses contains _locators_ of elements, that are used in tests, e.g. buttons, inputs etc.

Directory structure:

```
+-- Projects
|   +-- pages
|       +-- login.page.ts
|       +-- ...
|   +-- tests
|       +-- login.spac.ts
|       +-- ...
```

### Page implementation

Simple implementation of login page in `./pages/login.page.ts`:

```
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');
}

```

### Usage in tests

First import of selected page:

```
import { LoginPage } from '../pages/login.page';
```

Then use page in tests:

```
    // Act
    const loginPage = new LoginPage(page)
    await loginPage.loginInput.fill(userId)
    await loginPage.passwordInput.fill(userPassword)
    await loginPage.loginButton.click()
```
