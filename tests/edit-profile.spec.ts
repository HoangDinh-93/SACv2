import { test } from "../fixture/page-fixture";
import { UrlConstants } from "../constants/url-constants";
import accountData from "../data/data.json";

test.beforeEach(async ({ page, loginPage }) => {
  await loginPage.delay(25000);
});

test.afterEach(async ({ page, loginPage }) => {
  await loginPage.delay(25000);
});

for (const data of accountData) {
  test(`Edit account ${data.account}`, async ({
    page,
    loginPage,
    homePage,
    profilePage,
    editProfilePage,
  }) => {
    await loginPage.goto("https://store.steampowered.com/login");
    await loginPage.login(data.account, data.password);
    await homePage.goToProfilePage();
    await profilePage.goToSetupSteamProfile();
    await editProfilePage.editProfile(data.number.toString(), data.avatar);
    await editProfilePage.logout();
  });
}
