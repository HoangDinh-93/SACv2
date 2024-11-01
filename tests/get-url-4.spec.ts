import { test } from "../fixture/page-fixture";
import { UrlConstants } from "../constants/url-constants";
import { setUsePersistentContext } from "../core/browser-factory";
import {
  readJsonFile,
  removeItems,
  updateJsonFile,
  writeJsonFile,
} from "../core/utils/json-helper";

type Account = {
  number: string;
  account: string;
  password: string;
  email: string;
  emailPassword: string;
  avatar: string;
};

setUsePersistentContext();

const accountList = readJsonFile<Account[]>("data/account/account-4.json");

const account = {
  email: "jennyhastopee983@gmail.com",
  password: "miangubucu",
  data: accountList,
  path: "data/url/url-4.json",
  combinedPath: "data/combined/combined-4.json",
};

test.afterAll(async () => {
  const urlList = readJsonFile<string[]>(account.path);
  const combines: { id: string; url: string }[] = [];
  for (let i = 0; i < urlList.length; i++) {
    const combined = {
      id: account.data[i].number,
      url: urlList[i],
    };
    combines.push(combined);
  }
  writeJsonFile(account.combinedPath, combines);
  writeJsonFile(account.path, []);
});

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
  while (true) {
    const regex = /creationid=(\d+)$/;
    const url = await gmailPage.verifyEmail(true);
    const match = url.match(regex);
    const result =
      "https://store.steampowered.com/join/completesignup?creationid=" +
      (match ? match[1] : "");
    urls.push(result);
    const combined = {
      id: account.data[index].number,
      url: result,
    };
    updateJsonFile(account.path, result);
    await gmailPage.returnMainPage();
    index++;
  }
});
