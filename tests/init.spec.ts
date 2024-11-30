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
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import { getAbsolutePath, joinPath } from "./../core/utils/path-helper";
import { PathConstants } from "../constants/path-constants";
import { profileDataProvider } from "../utils/data-provider/data-provider";

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

interface Profile {
  [key: string]: Account[];
}

const numberToString = (number: number): string => {
  if (number < 100) {
    return number.toString().padStart(3, "0");
  } else {
    return number.toString();
  }
};

export const processInputData = async (
  profile: string,
  option: string
): Promise<Account[]> => {
  const importData = readJsonFile<Accounts>("configuration/appsettings.json");
  const exportData: Account[] = [];

  const start = importData[profile].start;
  const end = importData[profile].end;

  for (let i = start; i <= end; i++) {
    const number = numberToString(i);
    const baseNumber = Math.floor(i / 1000) * 1000;
    const account = importData[profile].accountPrefix + i;
    const password =
      option == "0"
        ? importData[profile].passwordPrefix
        : importData[profile].passwordPrefix + Math.floor((i - baseNumber) / 5);
    const avatarPath = joinPath(
      PathConstants.PATH_TO_IMAGE,
      importData[profile].avatar
    );

    exportData.push({
      number: number,
      account: account,
      password: password,
      email: importData[profile].email,
      emailPassword: importData[profile].password,
      avatar: avatarPath,
    });
  }

  return exportData;
};

test.afterAll(async () => {
  for (const profile of profileDataProvider) {
    const createdData = readJsonFile<Account[]>(profile.paths.created);
    removeItems<Account>(profile.accountData, "number", createdData);
    writeJsonFile(profile.paths.account, profile.accountData);
  }
});

test("Init", async () => {
  const profileData = readJsonFile<Accounts>("configuration/appsettings.json");

  for (let i = 1; i <= Object.keys(profileData).length; i++) {
    const data = await processInputData(`profile_${i}`, "1");
    writeJsonFile(`data/account/account-${i}.json`, data);
  }
});
