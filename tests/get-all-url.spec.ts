import { test } from "../fixture/page-fixture";
import { UrlConstants } from "../constants/url-constants";
import { setUsePersistentContext } from "../core/browser-factory";
import {
  readJsonFile,
  removeItems,
  updateJsonFile,
  writeJsonFile,
} from "../core/utils/json-helper";
import { read } from "fs";
import { Account } from "../core/models/types";

let hasFailed: boolean = false;

setUsePersistentContext();

let accountList_1 = readJsonFile<Account[]>("data/account/account-1.json");
let accountList_2 = readJsonFile<Account[]>("data/account/account-2.json");
let accountList_3 = readJsonFile<Account[]>("data/account/account-3.json");
let accountList_4 = readJsonFile<Account[]>("data/account/account-4.json");

const accounts = [
  {
    email: "email1@gmail.com",
    password: "password1",
    data: accountList_1,
    path: "data/url/url-1.json",
    combinedPath: "data/combined/combined-1.json",
  },
  {
    email: "email2@gmail.com",
    password: "password2",
    data: accountList_2,
    path: "data/url/url-2.json",
    combinedPath: "data/combined/combined-2.json",
  },
  {
    email: "email3@gmail.com",
    password: "password3",
    data: accountList_3,
    path: "data/url/url-3.json",
    combinedPath: "data/combined/combined-3.json",
  },
  {
    email: "email4@gmail.com",
    password: "password4",
    data: accountList_4,
    path: "data/url/url-4.json",
    combinedPath: "data/combined/combined-4.json",
  },
];

test.afterAll(async () => {});

for (const account of accounts) {
  test(`Get URLs from ${account.email}`, async ({ gmailPage }) => {
    let index = 0;
    let urls = [];
    let combines = [];
    await gmailPage.goto(UrlConstants.GMAIL_URL);
    if (!(await gmailPage.isLoggedin())) {
      await gmailPage.login(account.email, account.password);
    } else if (!(await gmailPage.isCurrentAccount(account.email))) {
      await gmailPage.logout();
      await gmailPage.login(account.email, account.password);
    }
    await gmailPage.waitUntilGmailLoaded();
    while (await gmailPage.doesNewEmailExist()) {
      const regex = /creationid=(\d+)$/;
      const url = await gmailPage.verifyEmail(false);
      const match = url.match(regex);
      const result =
        "https://store.steampowered.com/join/completesignup?creationid=" +
        (match ? match[1] : "");
      urls.push(result);
      const combined = {
        id: account.data[index].number,
        url: result,
      };
      combines.push(combined);
      // updateJsonFile(account.combinedPath, combines);
      await gmailPage.returnMainPage();
      index++;
    }
    writeJsonFile(account.path, urls);
    writeJsonFile(account.combinedPath, combines);
  });
}
