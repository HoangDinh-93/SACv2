import { Page } from "@playwright/test";
import { Element } from "../core/element";
import { skip } from "node:test";

export class GmailPage {
  private title: Element;
  private heading1: Element;
  private heading2: Element;
  private gmailIcon: Element;
  private emailDropdown: Element;
  private passwordField: Element;
  private nextBtn: Element;
  private refreshBtn: Element;
  private confirmEmail: Element;
  private verifyBtn: Element;
  private avatar: Element;
  private logoutOption: Element;
  private logoutIframe: string = "//iframe[@name='account']";

  constructor(private page: Page) {
    this.title = new Element(page, "//title[contains(text(), 'Gmail')]");
    this.heading1 = new Element(
      page,
      "//span[text()='Xác minh danh tính của bạn']"
    );
    this.heading2 = new Element(page, "//span[text()='Chọn tài khoản']");
    this.gmailIcon = new Element(page, "//img/ancestor::a[@title='Gmail']");
    this.emailDropdown = new Element(page, "//div[@role='link']/div[2]");
    this.passwordField = new Element(page, "//input[@type='password']");
    this.nextBtn = new Element(page, "//span[text()='Tiếp theo']");
    this.refreshBtn = new Element(page, "//div[@aria-label='Làm mới']");
    // this.confirmEmail = new Element(page, "//div[@role='tabpanel'][1]//tr[1]");
    this.confirmEmail = new Element(
      page,
      "//div[@role='tabpanel'][1]//span[text()='Steam']//ancestor::tr"
    );
    this.verifyBtn = new Element(
      page,
      "//span[contains(text(), 'Verify My Email Address')]/ancestor::a"
    );
    this.avatar = new Element(
      page,
      "//header//a[contains(@aria-label, '@gmail.com')]"
    );
    this.logoutOption = new Element(
      page,
      "//div/span[@data-sobt]/a",
      this.logoutIframe
    );
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async clickOnAccount(email: string): Promise<void> {
    const accountTemplate = `//div[@data-email='${email}']`;
    const accountElement = new Element(this.page, accountTemplate);
    await accountElement.clickOnElement();
  }

  async login(email: string, password: string): Promise<void> {
    while (true) {
      if (await this.heading1.isElementVisible()) {
        await this.nextBtn.clickOnElement();
        if ((await this.emailDropdown.getTextFromElement()) == email) {
          await this.passwordField.inputText(password);
          await this.nextBtn.clickOnElement();
        } else {
          await this.emailDropdown.clickOnElement();
          await this.clickOnAccount(email);
          await this.nextBtn.clickOnElement();
          await this.passwordField.inputText(password);
          await this.nextBtn.clickOnElement();
        }
        break;
      } else if (await this.heading2.isElementVisible()) {
        await this.clickOnAccount(email);
        await this.nextBtn.clickOnElement();
        await this.passwordField.inputText(password);
        await this.nextBtn.clickOnElement();
        break;
      } else if (await this.refreshBtn.isElementVisible()) {
        break;
      }
      // retries--;
      await this.page.waitForTimeout(1000);
    }
  }

  async verifyEmail(reload: boolean): Promise<string> {
    if (reload) {
      while (await this.confirmEmail.isElementHidden()) {
        await this.refreshBtn.clickOnElement();
        await this.page.waitForTimeout(1000);
      }
    }
    await this.confirmEmail.clickOnElement();
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.verifyBtn.clickOnElement(),
    ]);
    const url = newPage.url();
    await this.page.waitForTimeout(3000);
    await newPage.close();
    return url;
  }

  async waitUntilGmailLoaded(): Promise<void> {
    await this.gmailIcon.waitForElementToBeVisible(15000);
    await this.page.waitForTimeout(1000);
  }

  async doesNewEmailExist(): Promise<boolean> {
    return await this.confirmEmail.isElementVisible();
  }

  async returnMainPage(): Promise<void> {
    await this.gmailIcon.clickOnElement();
  }

  async isCurrentAccount(gmail: string): Promise<boolean> {
    const placeholder = await this.title.getTextFromElement();
    const text = placeholder ? placeholder : "$";
    return text.includes(gmail);
  }

  async isLoggedin(): Promise<boolean> {
    return await this.refreshBtn.isElementVisible();
  }

  async logout(): Promise<void> {
    await this.avatar.clickOnElement();
    await this.logoutOption.waitForElementToBeVisible();
    await this.logoutOption.clickOnElement();
  }

  async bringToFront(): Promise<void> {
    await this.page.bringToFront();
  }
}
