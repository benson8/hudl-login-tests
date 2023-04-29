"use strict";

const BasePage = require("./BasePage");

class HomePage extends BasePage {
  async homePageDisplays() {
    const teamIdElement = "a[data-qa-id=webnav-teamswitcher-team-320073]";

    return this.elementIsEnabled(teamIdElement);
  }

  async logOut() {
    let accountMenu = "";
    let logOutLink = "";
    switch (process.env.MOBILE_WEB) {
      case "true": {
        accountMenu = '//div[@class="hui-secondarynav__menu-icon"]';
        logOutLink =
          '//div[contains(@class,"hui-globaladditionalitems--phone")]/a';
        break;
      }
      case "false": {
        accountMenu = '//div[@class="hui-globaluseritem__display-name"]';
        logOutLink = '//a[@data-qa-id="webnav-usermenu-logout"]';
        break;
      }
    }
    await this.click(accountMenu, "xpath");
    await this.click(logOutLink, "xpath");
  }
}
module.exports = new HomePage();
