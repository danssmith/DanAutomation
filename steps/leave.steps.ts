import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { LeavePage } from "../pages/leave.page";
import { config } from "../playwright.config";
import { getPage } from "../utils/browser-manager";

Given("the User has successfully logged into OrangeHRM", async function () {
    const page = getPage();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(config.credentials.username, config.credentials.password);
    await loginPage.expectDashboard();
});

Given("the User navigates to the Leave page", async function () {
    const page = getPage();
    const leavePage = new LeavePage(page);
    await leavePage.navigate();
});

When("the User sets a date range", async function () {
    const page = getPage();
    const leavePage = new LeavePage(page);
    await leavePage.setDateRange("2025-01-01", "2025-30-06");
});

When("the User clicks search", async function () {
    const page = getPage();
    const leavePage = new LeavePage(page);
    await leavePage.clickSearch();
});

Then("the search results should be displayed", async function () {
    const page = getPage();
    const leavePage = new LeavePage(page);
    const tableVisible = await leavePage.isResultsTableVisible();
    const noRecordsVisible = await leavePage.isNoRecordsMessageVisible();
    expect(tableVisible || noRecordsVisible).toBeTruthy();
});

Then("{string} will be displayed to the User", async function (expectedText: string) {
    const page = getPage();
    await expect(page.getByText(expectedText)).toBeVisible();
});