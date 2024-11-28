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

interface Data {
  start: number;
  end: number;
  email: string;
  password: string;
  accountPrefix: string;
  passwordPrefix: string;
  avatar: string;
}

interface Accounts {
  [key: string]: Data;
}

interface Combine {
  id: string;
  url: string;
}

test.afterAll(async () => {});

test("Combine", async () => {
  const profileData = readJsonFile<Accounts>("configuration/appsettings.json");

  for (let i = 1; i <= Object.keys(profileData).length; i++) {
    const accountList = readJsonFile<Account[]>(
      `data/account/account-${i}.json`
    );
    const urlList = readJsonFile<string[]>(`data/url/url-${i}.json`);
    const combines: Combine[] = [];
    for (let i = 0; i < urlList.length; i++) {
      const combined: Combine = {
        id: accountList[i].number,
        url: urlList[i],
      };
      combines.push(combined);
    }
    writeJsonFile(`data/combined/combined-${i}.json`, combines);
  }
});
