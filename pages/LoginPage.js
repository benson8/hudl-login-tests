"use strict";

const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  async enterUrl(theURL) {
    await this.navigateToUrl(theURL);
  }

  /**
   * Enter Hudl Log In Information and then click on the Log In Button
   *
   * @param {string} email Email to enter for logging in
   * @param {string} password Password to enter for logging in
   */
  async enterLogIn(email, password) {
    let emailField = "input[data-qa-id=email-input]";
    let passwordField = "input[data-qa-id=password-input]";

    await this.enterText(emailField, email, "css");
    await this.enterText(passwordField, password, "css");
    await this.clickLogInButton();
  }

  /**
   * Eventually can be used to test Remember Me functionality
   */
  async clickRememberMeButton() {
    const rememberMeButton = ".uni-form__check-indicator__background";

    await this.click(rememberMeButton, "css");
  }

  async clickLogInButton() {
    const logInButton = "logIn";

    await this.click(logInButton, "id");
  }

  async errorDisplays() {
    const errorDisplay = "p[data-qa-id=error-display]";

    return this.elementIsEnabled(errorDisplay);
  }

  async clickSignUpButton() {
    const signUpButton = "//a[@href='/register/signup']";

    await this.click(signUpButton, "xpath");
  }

  async clickNeedHelpLink() {
    const needHelpLink = "a[data-qa-id=need-help-link]";

    await this.click(needHelpLink, "css");
  }

  async clickLogInWithOrgranizationButton() {
    const logInWithOrganizationButton =
      "button[data-qa-id=log-in-with-organization-btn]";

    await this.click(logInWithOrganizationButton, "css");
  }
}
module.exports = new LoginPage();
