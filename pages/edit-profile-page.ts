import { Page } from "@playwright/test";
import { Element } from "../core/element";
import { expect } from "../fixture/page-fixture";

export class EditProfilePage {
  private profileNameField: Element;
  private displayName: Element;
  private avatarTab: Element;
  private uploadAvatarInput: Element;
  private saveBtn: Element;
  private cropper: Element;
  private yourAvatarsText: Element;
  private accountDropdown: Element;
  private signOutOption: Element;

  constructor(private page: Page) {
    this.profileNameField = new Element(page, "//input[@name='personaName']");
    this.displayName = new Element(page, ".profile_small_header_name > a");
    this.avatarTab = new Element(page, "//a[text()='Avatar']");
    this.uploadAvatarInput = new Element(page, "//input[@type='file']");
    this.saveBtn = new Element(page, "//button[text()='Save']");
    this.cropper = new Element(page, ".cropper-container");
    this.yourAvatarsText = new Element(page, "//div[text()='Your Avatars']");
    this.accountDropdown = new Element(page, "#account_pulldown");
    this.signOutOption = new Element(
      page,
      "//a[text()='Sign out of account...']"
    );
  }

  async inputProfileName(profileName: string): Promise<void> {
    await this.profileNameField.typeText(profileName);
  }

  async goToAvatarTab(): Promise<void> {
    await this.avatarTab.clickOnElement();
  }

  async uploadAvatar(filePath: string): Promise<void> {
    await this.uploadAvatarInput.uploadFile(filePath);
  }

  async editProfile(
    profileName: string,
    avatarFilePath: string
  ): Promise<void> {
    await this.inputProfileName(profileName);
    await this.saveBtn.clickOnElement();
    await this.goToAvatarTab();
    await this.uploadAvatar(avatarFilePath);
    await this.page.waitForTimeout(1000);
    await this.saveBtn.clickOnElement();
    await expect(await this.yourAvatarsText.getLocator()).toBeVisible({
      timeout: 10000,
    });
    expect(await this.displayName.getTextFromElement()).toBe(profileName);
  }

  async logout(): Promise<void> {
    await this.accountDropdown.clickOnElement();
    await this.signOutOption.clickOnElement();
  }
}
