import { Page } from "@playwright/test";
import { Element } from "../core/element";

export class BasePage {
  constructor(protected page: Page) {}

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async delay(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
