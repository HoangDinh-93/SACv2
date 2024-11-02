import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import { readJsonFile } from "./json-helper";
import { getAbsolutePath, joinPath } from "./path-helper";
import { PathConstants } from "../../constants/path-constants";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface Data {
  email: string;
  password: string;
  accountPrefix: string;
  passwordPrefix: string;
  avatar: string;
}

interface Accounts {
  [key: string]: Data;
}

const numberToString = (number: number): string => {
  if (number < 100) {
    return number.toString().padStart(3, "0");
  } else {
    return number.toString();
  }
};

const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => rl.question(question, resolve));
};

const processInputData = async (
  start: string,
  end: string
): Promise<
  Array<{
    number: string;
    account: string;
    password: string;
    email: string;
    emailPassword: string;
    avatar: string;
  }>
> => {
  const importData = readJsonFile<Accounts>("configuration/appsettings.json");
  const exportData: Array<{
    number: string;
    account: string;
    password: string;
    email: string;
    emailPassword: string;
    avatar: string;
  }> = [];

  for (let i = parseInt(start); i <= parseInt(end); i++) {
    const number = numberToString(i);
    const baseNumber = Math.floor(i / 1000) * 1000;
    const account = importData[baseNumber.toString()].accountPrefix + i;
    const password =
      importData[baseNumber.toString()].passwordPrefix +
      Math.floor((i - baseNumber) / 5);
    const avatarPath = joinPath(
      PathConstants.PATH_TO_IMAGE,
      importData[baseNumber.toString()].avatar
    );

    exportData.push({
      number: number,
      account: account,
      password: password,
      email: importData[baseNumber.toString()].email,
      emailPassword: importData[baseNumber.toString()].password,
      avatar: avatarPath,
    });
  }

  return exportData;
};

const main = async () => {
  const filePath = path.join(__dirname, "../../data/data.json");
  const start = await askQuestion("Enter the start index: ");
  const end = await askQuestion("Enter the end index: ");

  const data = await processInputData(start, end);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  rl.close();
};

main();
