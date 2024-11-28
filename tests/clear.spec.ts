import { test } from "../fixture/page-fixture";
import { UrlConstants } from "../constants/url-constants";
import { setUsePersistentContext } from "../core/browser-factory";
import {
  readJsonFile,
  removeItems,
  updateJsonFile,
  writeJsonFile,
} from "../core/utils/json-helper";

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

test("Init", async () => {
  const profileData = readJsonFile<Accounts>("configuration/appsettings.json");

  for (let i = 1; i <= Object.keys(profileData).length; i++) {
    const data = [];
    writeJsonFile(`data/account/account-${i}.json`, data);
    writeJsonFile(`data/combined/combined-${i}.json`, data);
    writeJsonFile(`data/created-account/created-${i}.json`, data);
    writeJsonFile(`data/edited-account/edited-${i}.json`, data);
  }
});
