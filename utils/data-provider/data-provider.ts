import { profilePaths } from "../../constants/path-constants";
import { Account } from "../../core/models/types";
import { readJsonFile } from "../../core/utils/json-helper";

const accountList_1 = readJsonFile<Account[]>(profilePaths.profile_1.account);
const accountList_2 = readJsonFile<Account[]>(profilePaths.profile_2.account);
const accountList_3 = readJsonFile<Account[]>(profilePaths.profile_3.account);
const accountList_4 = readJsonFile<Account[]>(profilePaths.profile_4.account);

const createdList_1: Account[] = readJsonFile(profilePaths.profile_1.created);
const createdList_2: Account[] = readJsonFile(profilePaths.profile_2.created);
const createdList_3: Account[] = readJsonFile(profilePaths.profile_3.created);
const createdList_4: Account[] = readJsonFile(profilePaths.profile_4.created);

const queueList_1 = readJsonFile<{ id: number; url: string }[]>(
  profilePaths.profile_1.queue
);
const queueList_2 = readJsonFile<{ id: number; url: string }[]>(
  profilePaths.profile_2.queue
);
const queueList_3 = readJsonFile<{ id: number; url: string }[]>(
  profilePaths.profile_3.queue
);
const queueList_4 = readJsonFile<{ id: number; url: string }[]>(
  profilePaths.profile_4.queue
);

const editedList_1 = readJsonFile<Account[]>(profilePaths.profile_1.edited);
const editedList_2 = readJsonFile<Account[]>(profilePaths.profile_2.edited);
const editedList_3 = readJsonFile<Account[]>(profilePaths.profile_3.edited);
const editedList_4 = readJsonFile<Account[]>(profilePaths.profile_4.edited);

export const profileDataProvider = [
  {
    profile: "Profile 1",
    accountData: accountList_1,
    createdData: createdList_1,
    queueData: queueList_1,
    editedData: editedList_1,
    paths: profilePaths.profile_1,
  },
  {
    profile: "Profile 2",
    accountData: accountList_2,
    createdData: createdList_2,
    queueData: queueList_2,
    editedData: editedList_2,
    paths: profilePaths.profile_2,
  },
  {
    profile: "Profile 3",
    accountData: accountList_3,
    createdData: createdList_3,
    queueData: queueList_3,
    editedData: editedList_3,
    paths: profilePaths.profile_3,
  },
  {
    profile: "Profile 4",
    accountData: accountList_4,
    createdData: createdList_4,
    queueData: queueList_4,
    editedData: editedList_4,
    paths: profilePaths.profile_4,
  },
];
