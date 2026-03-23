import { type Page, type Locator } from "playwright";

export class LeavePage {
    private readonly leaveLink: Locator;
    private readonly fromDateInput: Locator;
    private readonly toDateInput: Locator;
    private readonly searchButton: Locator;
    private readonly resultsTable: Locator;
    private readonly noRecordsMessage: Locator;

    constructor(private readonly page: Page) {
        this.leaveLink = page.getByRole("link", { name: "Leave" });
        this.fromDateInput = page.locator("div.oxd-input-group").filter({ hasText: "From Date" }).getByPlaceholder("yyyy-dd-mm");
        this.toDateInput = page.locator("div.oxd-input-group").filter({ hasText: "To Date" }).getByPlaceholder("yyyy-dd-mm");
        this.searchButton = page.getByRole("button", { name: "Search" });
        this.resultsTable = page.locator(".oxd-table");
        this.noRecordsMessage = page.getByText("No Records Found");
    }

    async navigate(): Promise<void> {
        await this.leaveLink.click();
    }

    async setDateRange(fromDate: string, toDate: string): Promise<void> {
        await this.fromDateInput.click({ clickCount: 3 });
        await this.fromDateInput.fill(fromDate);
        await this.toDateInput.click({ clickCount: 3 });
        await this.toDateInput.fill(toDate);
    }

    async clickSearch(): Promise<void> {
        await this.searchButton.click();
    }

    async isResultsTableVisible(): Promise<boolean> {
        return await this.resultsTable.isVisible();
    }

    async isNoRecordsMessageVisible(): Promise<boolean> {
        return await this.noRecordsMessage.isVisible();
    }
}