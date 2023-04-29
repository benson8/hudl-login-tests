"use strict";

const BasePage = require("./BasePage");

class LoginOrganizationPage extends BasePage {
  async logInWithEmailAndPasswordButtonExists() {
    const logInWithEmailAndPasswordButton =
      "button[data-qa-id=log-in-with-email-and-password]";

    return this.elementIsEnabled(logInWithEmailAndPasswordButton);
  }
}
module.exports = new LoginOrganizationPage();
