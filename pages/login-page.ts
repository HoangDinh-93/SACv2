import { Page } from "@playwright/test";
import { Element } from "../core/element";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
  private accountNameField: Element;
  private passwordField: Element;
  private signInBtn: Element;

  constructor(page: Page) {
    super(page);
    this.accountNameField = new Element(
      page,
      "//div[text()='Sign in with account name']//following-sibling::input"
    );
    this.passwordField = new Element(
      page,
      "//div[text()='Password']//following-sibling::input"
    );
    this.signInBtn = new Element(page, "//button[text()='Sign in']");
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async login(account: string, password: string): Promise<void> {
    await this.accountNameField.inputText(account);
    await this.passwordField.inputText(password);
    await this.signInBtn.clickOnElement();
  }
}
