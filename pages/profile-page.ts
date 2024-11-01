import { Page } from "@playwright/test";
import { Element } from "../core/element";

export class ProfilePage {
  private setupBtn: Element;
  private editProfileBtn: Element;

  constructor(private page: Page) {
    this.setupBtn = new Element(
      page,
      "//span[text()='Setup Steam Profile']/.."
    );
    this.editProfileBtn = new Element(page, "//span[text()='Edit Profile']/..");
  }

  async goToSetupSteamProfile(): Promise<void> {
    try {
      await this.setupBtn.waitForElementToBeVisible();
      await this.setupBtn.clickOnElement();
    } catch {
      await this.editProfileBtn.clickOnElement();
    }
  }
}
