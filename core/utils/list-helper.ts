import { readJsonFile, writeJsonFile } from "./json-helper";

type Account = {
  number: string;
  account: string;
  password: string;
  email: string;
  emailPassword: string;
  avatar: string;
};
