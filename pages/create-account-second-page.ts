import { Page } from "@playwright/test";
import { Element } from "../core/element";

export class CreateAccountSecondPage {
  private accountNameField: Element;
  private passwordField: Element;
  private confirmPasswordField: Element;
  private createBtn: Element;
  private goToCreateAccountPageBtn: Element;

  constructor(private page: Page) {
    this.accountNameField = new Element(page, "#accountname");
    this.passwordField = new Element(page, "#password");
    this.confirmPasswordField = new Element(page, "#reenter_password");
    this.createBtn = new Element(page, "#createAccountButton");
    this.goToCreateAccountPageBtn = new Element(
      page,
      "//div[@class='create_newaccount_intro']/following-sibling::button"
    );
  }

  async goto(url?: string): Promise<void> {
    if (url) {
      await this.page.goto(url);
    } else {
      await this.goToCreateAccountPageBtn.clickOnElement();
    }
  }

  async createAccount(accountName: string, password: string): Promise<void> {
    await this.accountNameField.clickOnElement();
    await this.accountNameField.typeText(accountName);
    await this.passwordField.clickOnElement();
    await this.passwordField.typeText(password);
    await this.confirmPasswordField.clickOnElement();
    await this.confirmPasswordField.typeText(password);
    await this.page.waitForTimeout(1000);
    await this.createBtn.clickOnElement();
  }

  async bringToFront(): Promise<void> {
    await this.page.bringToFront();
  }
}
