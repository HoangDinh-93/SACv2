import * as fs from "fs";
import { getAbsolutePath } from "./path-helper";

export const readJsonFile = <T>(filePath: string): T => {
  const absolutePath = getAbsolutePath(filePath);
  const fileContent = fs.readFileSync(absolutePath, "utf-8");
  const jsonData = JSON.parse(fileContent);
  return jsonData as T;
};

export const writeJsonFile = <T>(filePath: string, data: T): void => {
  const absolutePath = getAbsolutePath(filePath);
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(absolutePath, jsonData, "utf-8");
};

export const updateJsonFile = <T>(filePath: string, data: T): void => {
  const accountData: T[] = readJsonFile(filePath);
  const existingDataSet = new Set(
    accountData.map((item) => JSON.stringify(item))
  );
  if (!existingDataSet.has(JSON.stringify(data))) {
    const result = accountData.concat(data);
    writeJsonFile(filePath, result);
  }
};

export const clearJsonFile = <T>(filePath: string): void => {
  const jsonData: T[] = [];
  writeJsonFile(filePath, jsonData);
};

export const removeItem = <T>(
  array: T[],
  identifier: keyof T,
  value: T[keyof T]
): T | undefined => {
  const index = array.findIndex((obj) => obj[identifier] === value);
  if (index !== -1) {
    return array.splice(index, 1)[0];
  } else {
    return undefined;
  }
};

export const removeItems = <T>(
  array: T[],
  identifier: keyof T,
  subArray: T[]
): void => {
  subArray.forEach((item) => {
    const index = array.findIndex(
      (obj) => obj[identifier] === item[identifier]
    );
    if (index !== -1) {
      array.splice(index, 1);
    }
  });
};

export const removeStringItems = (
  array: string[],
  subArray: string[]
): void => {
  subArray.forEach((item) => {
    const index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }
  });
};
