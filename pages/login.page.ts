import { type Page, type Locator } from "playwright";

export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(private readonly page: Page) {
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole("button", { name: "Login" });
    }

    async goto(): Promise<void> {
        await this.page.goto("/");
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectDashboard(): Promise<void> {
        await this.page.waitForURL("**/dashboard/**");
    }
}