import { test } from "../fixture/page-fixture";
import { UrlConstants } from "../constants/url-constants";
import accountData from "../data/data.json";

test.beforeEach(async ({ gmailPage }) => {
  await gmailPage.goto(UrlConstants.GMAIL_URL);
  await gmailPage.logout();
});

// test.afterEach(async ({ gmailPage }) => {
//   await gmailPage.logout();
// });

test("Confirm", async ({ gmailPage }) => {
  while (true) {
    await gmailPage.login("cuongdog51@gmail.com", "miangubucu");
    for (let i = 0; i < 5; i++) {
      await gmailPage.verifyEmail();
      await gmailPage.returnMainPage();
    }
    await gmailPage.logout();
    await gmailPage.login("cuongdog50@gmail.com", "miangubucu");
    for (let i = 0; i < 5; i++) {
      await gmailPage.verifyEmail();
      await gmailPage.returnMainPage();
    }
    await gmailPage.logout();
  }
});
