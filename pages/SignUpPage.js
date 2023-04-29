"use strict";

const BasePage = require("./BasePage");

class SignUpPage extends BasePage {
  async registerDemoLinkExists() {
    const registerDemoLink = "#register_demo";

    return this.elementIsEnabled(registerDemoLink);
  }
}
module.exports = new SignUpPage();
