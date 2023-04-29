"use strict";

const BasePage = require("./BasePage");

class HelpPage extends BasePage {
  async resetPasswordHeadlineExists() {
    const resetPasswordHeadline = "h3[data-qa-id=lets-reset-password-headline]";

    return this.elementIsEnabled(resetPasswordHeadline);
  }
}
module.exports = new HelpPage();
