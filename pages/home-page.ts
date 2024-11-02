import { Page } from "@playwright/test";
import { Element } from "../core/element";
import { expect } from "../fixture/page-fixture";

export class HomePage {
  private avatar: Element;

  constructor(private page: Page) {
    this.avatar = new Element(page, ".user_avatar");
  }

  async verifyAccountCreated(): Promise<void> {
    await expect(await this.avatar.getLocator()).toBeVisible({
      timeout: 15000,
    });
  }

  async goToProfilePage(): Promise<void> {
    await this.avatar.clickOnElement();
  }
}
