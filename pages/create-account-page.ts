import { Page } from "@playwright/test";
import { Element } from "../core/element";

export class CreateAccountPage {
  private emailAddressField: Element;
  private confirmEmailAddressField: Element;
  private captchaCheckbox: Element;
  private captchaCheckedIcon: Element;
  private agreeCheckbox: Element;
  private continueBtn: Element;
  private goToNextPageBtn: Element;
  private captchaIframe = "//iframe[@title='reCAPTCHA']";

  constructor(private page: Page) {
    this.emailAddressField = new Element(page, "#email");
    this.confirmEmailAddressField = new Element(page, "#reenter_email");
    this.captchaCheckbox = new Element(
      page,
      "#recaptcha-anchor",
      this.captchaIframe
    );
    this.captchaCheckedIcon = new Element(
      page,
      "//span[@aria-checked='true']",
      this.captchaIframe
    );
    this.agreeCheckbox = new Element(page, "#i_agree_check");
    this.continueBtn = new Element(page, "#createAccountButton");
    this.goToNextPageBtn = new Element(
      page,
      "//div[@class='create_newaccount_intro']/following-sibling::button"
    );
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async inputEmailAddress(email: string): Promise<void> {
    await this.emailAddressField.clickOnElement();
    await this.emailAddressField.typeText(email);
  }

  async inputConfirmEmailAddress(email: string): Promise<void> {
    await this.confirmEmailAddressField.clickOnElement();
    await this.confirmEmailAddressField.typeText(email);
  }

  async clickOnCaptchaCheckbox(): Promise<void> {
    await this.captchaCheckbox.clickOnElement();
  }

  async waitForCaptchaDone(): Promise<void> {
    await this.captchaCheckbox.waitForElementToDisappear();
  }

  async clickOnAgreeCheckbox(): Promise<void> {
    await this.agreeCheckbox.clickOnElement();
  }

  async clickOnContinueBtn(): Promise<void> {
    await this.continueBtn.clickOnElement();
  }

  async createAccount(email: string): Promise<void> {
    await this.inputEmailAddress(email);
    await this.inputConfirmEmailAddress(email);
    await this.captchaCheckbox.clickOnElement();
    while (await this.captchaCheckedIcon.isElementHidden()) {
      await this.page.waitForTimeout(1000);
    }
    // await this.page.pause();
    await this.clickOnAgreeCheckbox();
    await this.clickOnContinueBtn();
  }

  async bringToFront(): Promise<void> {
    await this.page.bringToFront();
  }

  async pause(): Promise<void> {
    await this.page.pause();
  }
}
