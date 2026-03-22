import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { config } from "../playwright.config";
import { getPage } from "../utils/browser-manager";

Given("the User is on the OrangeHRM login page", async function () {
    const page = getPage();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
});

When("the User enters valid credentials", async function () {
    const page = getPage();
    const loginPage = new LoginPage(page);
    await loginPage.login(config.credentials.username, config.credentials.password);
    await loginPage.expectDashboard();
});

When("the User enters an invalid username and valid password", async function () {
    const page = getPage();
    const loginPage = new LoginPage(page);
    await loginPage.login("InvalidUser", config.credentials.password);
});

When("the User enters a valid username and invalid password", async function () {
    const page = getPage();
    const loginPage = new LoginPage(page);
    await loginPage.login(config.credentials.username, "WrongPassword");
});

When("the User enters an invalid username and invalid password", async function () {
    const page = getPage();
    const loginPage = new LoginPage(page);
    await loginPage.login("InvalidUser", "WrongPassword");
});

When("the User attempts to login without providing any credentials", async function () {
    const page = getPage();
    const loginPage = new LoginPage(page);
    await loginPage.login("", "");
});

When("the User attempts to login with an empty username and valid password", async function () {
    const page = getPage();
    const loginPage = new LoginPage(page);
    await loginPage.login("", config.credentials.password);
});

When("the User attempts to login with a valid username and empty password", async function () {
    const page = getPage();
    const loginPage = new LoginPage(page);
    await loginPage.login(config.credentials.username, "");
});

Then("the User should see the dashboard", async function () {
    const page = getPage();
    await expect(page).toHaveURL(/dashboard/);
});

Then("the User should see an error message", async function () {
    const page = getPage();
    const errorMessage = page.getByText("Invalid credentials");
    await expect(errorMessage).toBeVisible();
});

Then("the error message should display the wording: {string}", async function (expectedText: string) {
    const page = getPage();
    const errorMessage = page.getByText(expectedText);
    await expect(errorMessage).toBeVisible();
});

Then("the User should see {string} under the username field", async function (expectedText: string) {
    const page = getPage();
    const usernameGroup = page.getByPlaceholder("Username").locator("../../..");
    await expect(usernameGroup.getByText(expectedText)).toBeVisible();
});

Then("the User should see {string} under the password field", async function (expectedText: string) {
    const page = getPage();
    const passwordGroup = page.getByPlaceholder("Password").locator("../../..");
    await expect(passwordGroup.getByText(expectedText)).toBeVisible();
});