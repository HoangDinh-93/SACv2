import {
  test as baseTest,
  expect as baseExpect,
  BrowserContext,
  chromium,
  Page,
} from "@playwright/test";
import { CreateAccountPage } from "../pages/create-account-page";
import { CreateAccountSecondPage } from "../pages/create-account-second-page";
import { HomePage } from "../pages/home-page";
import { ProfilePage } from "../pages/profile-page";
import { EditProfilePage } from "../pages/edit-profile-page";
import { GmailPage } from "../pages/gmail-page";
import { LoginPage } from "../pages/login-page";
import { createBrowserContext } from "../core/browser-factory";
import {
  userDataDir,
  executablePath,
} from "../configuration/browsersettings.json";

type PageFixture = {
  context: BrowserContext;
  page: Page;
  createAccountPage: CreateAccountPage;
  createAccountSecondPage: CreateAccountSecondPage;
  loginPage: LoginPage;
  homePage: HomePage;
  profilePage: ProfilePage;
  editProfilePage: EditProfilePage;
  gmailPage: GmailPage;
};

export const test = baseTest.extend<PageFixture>({
  context: async ({}, use) => {
    const context = await createBrowserContext({
      userDataDir,
      executablePath,
    });
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
  createAccountPage: async ({ context }, use) => {
    const page = await context.pages()[0];
    const createAccountPage = new CreateAccountPage(page);
    await use(createAccountPage);
  },
  gmailPage: async ({ context }, use) => {
    const page = await context.newPage();
    const gmailPage = new GmailPage(page);
    await use(gmailPage);
    await page.close();
  },
  createAccountSecondPage: async ({ context }, use) => {
    const page = await context.pages()[0];
    const createAccountSecondPage = new CreateAccountSecondPage(page);
    await use(createAccountSecondPage);
    await page.close();
  },
  loginPage: async ({ context }, use) => {
    const page = await context.pages()[0];
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ context }, use) => {
    const page = await context.pages()[0];
    const homePage = new HomePage(page);
    await use(homePage);
  },
  profilePage: async ({ context }, use) => {
    const page = await context.pages()[0];
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },
  editProfilePage: async ({ context }, use) => {
    const page = await context.pages()[0];
    const editProfilePage = new EditProfilePage(page);
    await use(editProfilePage);
    await page.close();
  },
});

export const expect = baseExpect;
