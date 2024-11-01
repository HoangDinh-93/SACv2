import { test } from "../fixture/page-fixture";
import { UrlConstants } from "../constants/url-constants";
import * as fs from "fs";
import * as path from "path";
import { setUsePersistentContext } from "../core/browser-factory";
import urlData50 from "../data/cuongdog50.json";
import accountData from "../data/account-50.json";
import urlBackupData from "../data/backup/cuongdog50.json";
import { getAbsolutePath } from "../core/utils/path-helper";
import { getDateTime } from "../core/utils/datetime-helper";
import { readJsonFile, writeJsonFile } from "../core/utils/json-helper";

const email = "nganlesouting790@gmail.com";
const password = "miangubucu";
// let urls: Array<string> = [];
setUsePersistentContext();

test.beforeEach(async ({ gmailPage }) => {
  await gmailPage.goto(UrlConstants.GMAIL_URL);
  if (!(await gmailPage.isLoggedin())) {
    await gmailPage.login(email, password);
  } else if (!(await gmailPage.isCurrentAccount(email))) {
    await gmailPage.logout();
    await gmailPage.login(email, password);
  }
});

test("Get URLs", async ({ gmailPage }) => {
  while (true) {
    // const filePath = path.join(__dirname, "../data/url-3.json");
    // const fileContent = fs.readFileSync(filePath, "utf-8");
    const regex = /creationid=(\d+)$/;
    const url = await gmailPage.verifyEmail(true);
    const match = url.match(regex);
    const result =
      "https://store.steampowered.com/join/completesignup?creationid=" +
      (match ? match[1] : "");
    const urls = readJsonFile<string[]>("data/url-3.json");
    urls.push(result);
    // fs.writeFileSync(filePath, JSON.stringify(urls, null, 2), "utf-8");
    writeJsonFile("data/url-3.json", urls);
    await gmailPage.returnMainPage();
  }
});
