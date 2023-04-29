"use strict";

const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { By } = require("selenium-webdriver");

require("dotenv").config();

/**
 * Instantiate browser. Potentially set to a mobile emulator in Chrome
 * if specified in .env. Note that Safari support for mobile emulators
 * is not up to par currently, but should be revisited in the future.
 */
const browser = process.env.BROWSER;
const mobileWeb = process.env.MOBILE_WEB;
const headless = process.env.HEADLESS;

let driver;
if (mobileWeb === "true") {
  const options = new chrome.Options().setMobileEmulation({
    deviceName: "Pixel 5",
  });
  if (headless === "true") {
    options.headless();
  }
  driver = new webdriver.Builder()
    .forBrowser(browser)
    .setChromeOptions(options)
    .build();
} else {
  if (headless === "true" && browser === "chrome") {
    const options = new chrome.Options().headless();
    driver = new webdriver.Builder()
      .forBrowser(browser)
      .setChromeOptions(options)
      .build();
  } else {
    driver = new webdriver.Builder().forBrowser(browser).build();
  }
}

driver.manage().setTimeouts({ implicit: 10000 });

class BasePage {
  constructor() {
    global.driver = driver;
  }

  /**
   * Navigates to a URL that is passed.
   *
   * @param {string} URL The URL to navigate to
   */
  async navigateToUrl(theURL) {
    if (process.env.MOBILE_WEB === "false") {
      driver.manage().window().maximize();
    }
    await driver.get(theURL);
  }

  /**
   * Enter Text in a Text Field
   *
   * @param {string} element The DOM element to find
   * @param {string} text The DOM element property value to set
   * @param {string} method The method to retrieve the DOM element property value ("xpath" or "css")
   */
  async enterText(element, text, method) {
    if (method === "css") {
      await driver.findElement(By.css(element)).sendKeys(text);
    } else {
      await driver.findElement(By.xpath(element)).sendKeys(text);
    }
  }

  /**
   * Click on a DOM element utilizing the passed element
   *
   * @param {string} element The DOM element to find
   * @param {string} method The method to retrieve the DOM element property value ("xpath", "css", or "id")
   */
  async click(element, method) {
    if (method === "css") {
      await driver.findElement(By.css(element)).click();
    } else if (method === "xpath") {
      await driver.findElement(By.xpath(element)).click();
    } else {
      await driver.findElement(By.id(element)).click();
    }
  }

  /**
   * Ensures that a DOM element is available on a page
   *
   * @param {string} element The DOM element to check for enablement
   *
   * @returns {boolean} Value for whether or not the element is enabled
   */
  async elementIsEnabled(element) {
    // While we would prefer to use isDisplayed, it is returning false even in circumstances
    // where the element is displayed...see the following Stackoverflow link for confirmation
    // of this behavior:
    //
    // https://stackoverflow.com/questions/72464608/isdisplayed-in-selenium-returning-false-all-the-time-even-element-is-there

    let elementEnabled = false;

    // SafariDriver does not seem to respect the various forms of waits in Selenium, so this
    // hack is mostly designed for it, where we see if an element is enabled and then try again
    // after three seconds. Ideally this would be a tight polling loop, assuming we can't find
    // a way to use Selenium's wait functionality with SafariDriver.
    try {
      elementEnabled = await driver.findElement(By.css(element)).isEnabled();
    } catch (e) {
      await new Promise((r) => setTimeout(r, 3000));
      elementEnabled = await driver.findElement(By.css(element)).isEnabled();
    }

    return elementEnabled;
  }

  async refreshPage() {
    await driver.navigate().refresh();
  }

  async quitBrowser() {
    await driver.quit();
  }
}

module.exports = BasePage;
