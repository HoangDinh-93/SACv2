import { Locator, Page } from "@playwright/test";

export class Element {
  private _locator: Locator;

  constructor(page: Page, selector: string, frameSelector?: string) {
    if (frameSelector) {
      this._locator = page.frameLocator(frameSelector).locator(selector);
    } else {
      this._locator = page.locator(selector);
    }
  }

  async delay(): Promise<void> {
    await this._locator.page().waitForTimeout(0);
  }

  async getLocator(): Promise<Locator> {
    return this._locator;
  }

  async waitForElementToBeVisible(duration?: number): Promise<void> {
    await this._locator
      .first()
      .waitFor({ state: "visible", timeout: duration ? duration : 5000 });
  }

  async waitForElementToDisappear(): Promise<void> {
    await this._locator.first().waitFor({ state: "hidden", timeout: 5000 });
  }

  async clickOnElement(): Promise<void> {
    await this.delay();
    await this._locator.first().click();
  }

  async inputText(text: string): Promise<void> {
    await this.clearText();
    await this.delay();
    await this._locator.first().fill(text);
  }

  async typeText(text: string): Promise<void> {
    await this.clearText();
    await this.delay();
    await this._locator.first().pressSequentially(text, { delay: 100 });
  }

  async clearText(): Promise<void> {
    await this.delay();
    await this._locator.first().fill("");
  }

  async getTextFromElement(): Promise<string | null> {
    return await this._locator.first().textContent();
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.delay();
    await this._locator.first().setInputFiles(filePath);
  }

  async isElementVisible(): Promise<boolean> {
    return await this._locator.first().isVisible();
  }

  async isElementHidden(): Promise<boolean> {
    return await this._locator.first().isHidden();
  }
}
