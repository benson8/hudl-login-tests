# hudl-login-tests

A suite of browser tests for the [Hudl Log In Page](https://www.hudl.com/login), utilizing [**_Node.js_**](https://nodejs.org/en), [**_Mocha_**](https://mochajs.org/), and [**_Selenium Webdriver_**](https://www.selenium.dev/documentation/webdriver/).

## MacOs Prerequisites

If Node is not installed, there are various ways to install it, but downloading Node Version Manager (nvm) per [these instructions](https://github.com/nvm-sh/nvm#installing-and-updating) and installing it is likely the most straightforward. Once nvm is installed, run the following command to get the latest long-term support version of Node.js:

```bash
nvm install —lts
```

## Windows Prerequisites

If Node is not installed, downloading the latest version from [the official Node.js download page](https://nodejs.org/en/download) will provide an easy to use Windows installer.

Installing [Git for Windows](https://gitforwindows.org/) will also get you a Bash shell where you can run the commands specified below.

## Test Suite Initilization and Credentials

From the base directory of hudl-login-tests, run the following command:

```bash
npm i
```

This should install all necessary dependencies for the tests.

Edit .env in the base directory of the project and change the following lines to valid authentication credentials for https://hudl.com/login:

```bash
VALID_USERNAME="YOUR@EMAIL.ADDRESS"
VALID_PASSWORD="YOUR_PASSWORD"
```

## Running Tests

The simplest way to run tests is to invoke the default scenario of Chrome Desktop. From the base directory of the project:

```bash
npx mocha tests
```

Chrome should fire up, and the tests should execute in rapid sequence.

## Alternative Browsers

The tests also support the following combinations:

- Chrome Mobile Web (Pixel 5)
- Safari Desktop
- Chrome Headless (both desktop and mobile)

For example, to run Chrome Mobile Web, edit the appropriate environment variables in .env, or provide overrides on the command line:

```bash
env BROWSER="chrome" MOBILE_WEB="true" HEADLESS="false" npx mocha tests
```

To run all five supported browser scenarios in sequence, test-runner.sh can be invoked:

```bash
./test-runner.sh
```

Note on Safari - If you have not used it for automation previously, you might receive the following error:

> SessionNotCreatedError: Could not create a session: You must enable the 'Allow Remote Automation' option in Safari's Develop menu to control Safari via WebDriver.

To fix this, you can follow either of the methods listed in [Apple's instructions](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari#2957277) for enabling WebDriver support.

## Supported Configurations

While the test suite should run on most recent versions of Node.js, it has been tested on the following configurations:

- MacOS Ventura 13.2.1, Node.js 18.16.0
- MacOS Big Sur 11.6.8, Node.js 17.0.1
- Windows 10, Node.js 18.16.0

See [package-lock.json](https://github.com/benson8/hudl-login-tests/blob/main/package-lock.json) for versions of items such as Chromedriver, which `npm i` should take care of installing automatically.

## Test Suite Design Considerations and Best Practices

The test suite is structured with the [Page Object Model format](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/). Each test case can be run in isolation or in combination. Each test case utilizes a page load for the log in page at the start in order to allow for this. For example, to run just the happy path log in test:

```bash
npx mocha -g "Happy Path" tests
```

Browser instantiation is performed at the start of the test run. With the suite as simple as it currently is, it runs much quicker this way.

Test cases follow the format of steps that a user would take interacting with the web site. This mostly obviates the need for comments (see the refactoring section below for more details).

Page Objects are structured with the locators directly embedded in the function definition for a particular object.

Comments are only included for functions that are not fully self explanatory.

Instead of a static set of invalid credentials, the test suite uses the [Chance](https://chancejs.com/) Javascript library to generate a set of unique random credentials for each test run. Opinions vary on suites that use a mixture of example-based tests and random or coverage-guided input, but as long as the credentials are easily located in logs in case the test case that utilizes them fails, it seems like a worthy addition. It's worth noting that concepts such as [Property-Based Testing](https://fast-check.dev/docs/introduction/why-property-based/) and [Fuzz Testing](https://gitlab.com/gitlab-org/security-products/analyzers/fuzzers/jsfuzz) are more sophisticated implementations of this approach. While not recommended for browser tests due to their resource intensive nature, they make a good case for utilizing a basic concept for them. I could go on, but I'll stop. 😃

[ESLint](https://eslint.org/) is utilized for static code analysis to ensure coding best practices are followed throughout the test suite. Run it as follows from the base directory:

```bash
npx eslint pages/* tests/*
```

[Prettier](https://prettier.io/) is utilized to ensure that code formatting is standardized throughout the project. If the Prettier plugin is not installed for your IDE, you can run it against all files:

```bash
npx prettier --write .
```

## Future Refactoring and Additional Considerations

In no particular order, the following items should be considered for improving the test suite:

- Use [Cypress](https://www.cypress.io/) or [Playwright](https://playwright.dev/) instead 😀 - A lot of what is being done in this project is already handled by these more modern and flexible frameworks.
- Convert project to Typescript.
- Fix Safari element loading pause hack - See [the commentary in the code](https://github.com/benson8/hudl-login-tests/blob/main/pages/BasePage.js#L99) for further details, but it's likely more investigation could lead to a more elegant solution.
- Move browser instantiation out of BasePage.js.
- Move credentials to a secure solution such as [Vault](https://www.vaultproject.io/) or [Bitwarden](https://bitwarden.com/)
- Move browser variables from [.env](https://github.com/benson8/hudl-login-tests/blob/main/.env) to a JSON configuration file
- Integrate with [Browserstack](https://www.browserstack.com/) or [Sauce Labs](https://saucelabs.com/) to gain additional device coverage (especially mobile Safari). There are of course real speed concerns with using this approach, so it would need to be a team decision of whether more coverage is desired that will take longer to run.
- Move random email address and password generation to a separate utility class.
- Add a test case for the Remember Me checkbox.
