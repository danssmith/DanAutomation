import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, Page, chromium } from "playwright";
import { config } from "../playwright.config";

setDefaultTimeout(30000);

let browser: Browser;
let page: Page;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ baseURL: config.baseURL });
    page = await context.newPage();
});

After(async function () {
    await browser.close();
});

export function getPage(): Page {
    return page;
}