"use strict";

require("dotenv").config();
const assert = require("assert");
const LoginPage = require("../pages/LoginPage");
const HomePage = require("../pages/HomePage");
const SignUpPage = require("../pages/SignUpPage");
const HelpPage = require("../pages/HelpPage.js");
const LoginOrganizationPage = require("../pages/LoginOrganizationPage");
const Chance = require("chance");

describe("Hudl Log In Tests", function () {
  this.timeout(20000);
  const loginUrl = "https://www.hudl.com/login";

  beforeEach(function () {});

  it("Hudl Log In Page - Need Help Link", async function () {
    await LoginPage.enterUrl(loginUrl);
    await LoginPage.clickNeedHelpLink();
    let helpPageExists = await HelpPage.resetPasswordHeadlineExists();
    assert.equal(
      helpPageExists,
      true,
      "Clicking on the 'Need Help' link did not render the Help Page"
    );
  });

  it("Hudl Log In Page - Sign up Button", async function () {
    await LoginPage.enterUrl(loginUrl);
    await LoginPage.clickSignUpButton();
    let signUpPageExists = await SignUpPage.registerDemoLinkExists();
    assert.equal(
      signUpPageExists,
      true,
      "Clicking on the 'Sign Up' button did not render the Sign Up Page"
    );
  });

  it("Hudl Log In Page - Log In with an Organization Page Link", async function () {
    await LoginPage.enterUrl(loginUrl);
    await LoginPage.clickLogInWithOrgranizationButton();
    let loginOrganizationPageExists =
      await LoginOrganizationPage.logInWithEmailAndPasswordButtonExists();
    assert.equal(
      loginOrganizationPageExists,
      true,
      "Clicking on the 'Log in With Organization' link did not render the Organization Log In Screen"
    );
  });

  it("Hudl Log In Page - Invalid Random Credentials Displays Error Message", async function () {
    let chance = new Chance();
    let randomEmail = chance.email();
    let randomPassword = chance.string();
    console.log("Random email used: %s", randomEmail);
    console.log("Random password used: %s", randomPassword);

    await LoginPage.enterUrl(loginUrl);
    await LoginPage.refreshPage();
    await LoginPage.enterLogIn(randomEmail, randomPassword);
    let errorMessageExists = await LoginPage.errorDisplays();
    assert.equal(
      errorMessageExists,
      true,
      "Error message did not exist after an invalid log in attempt with invalid credentials"
    );
  });

  it("Hudl Log In Page - No Credentials Displays Error Message", async function () {
    await LoginPage.enterUrl(loginUrl);
    await LoginPage.clickLogInButton();
    await LoginPage.errorDisplays();
    let errorMessageExists = await LoginPage.errorDisplays();
    assert.equal(
      errorMessageExists,
      true,
      "Error message did not exist after an invalid log in attempt with no credentials"
    );
  });

  it("Hudl Log In Page - Valid Credentials Happy Path", async function () {
    await LoginPage.enterUrl(loginUrl);
    await LoginPage.enterLogIn(
      process.env.VALID_USERNAME,
      process.env.VALID_PASSWORD
    );
    let homePageExists = await HomePage.homePageDisplays();
    assert.equal(
      homePageExists,
      true,
      "Home Page was not rendered after successfully logging in"
    );
    await HomePage.logOut();
  });

  after(async function () {
    await LoginPage.quitBrowser();
  });
});
