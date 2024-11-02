import { test } from "../fixture/page-fixture";
import { UrlConstants } from "../constants/url-constants";
import accountData from "../data/data.json";

test("Confirm", async ({ gmailPage }) => {
  while (true) {
    await gmailPage.bringToFront();
    await gmailPage.goto(UrlConstants.GMAIL_URL);
    await gmailPage.verifyEmail();
  }
});
