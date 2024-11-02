import { test } from "../fixture/page-fixture";
import {
  readJsonFile,
  removeItem,
  removeItems,
  updateJsonFile,
  writeJsonFile,
} from "../core/utils/json-helper";
import { Account } from "../core/models/types";

const created1: Account[] = readJsonFile("data/created-account/created-1.json");
const created2: Account[] = readJsonFile("data/created-account/created-2.json");
const created3: Account[] = readJsonFile("data/created-account/created-3.json");
const created4: Account[] = readJsonFile("data/created-account/created-4.json");

const accounts = [
  {
    profile: "Profile 1",
    data: created1,
    createdPath: "data/created-account/created-1.json",
    editedPath: "data/edited-account/edited-1.json",
  },
  {
    profile: "Profile 2",
    data: created2,
    createdPath: "data/created-account/created-2.json",
    editedPath: "data/edited-account/edited-2.json",
  },
  {
    profile: "Profile 3",
    data: created3,
    createdPath: "data/created-account/created-3.json",
    editedPath: "data/edited-account/edited-3.json",
  },
  {
    profile: "Profile 4",
    data: created4,
    createdPath: "data/created-account/created-4.json",
    editedPath: "data/edited-account/edited-4.json",
  },
];

test.beforeEach(async ({ page, loginPage }) => {
  await loginPage.delay(25000);
});

test.afterEach(async ({ page, loginPage }) => {
  await loginPage.delay(25000);
});

for (const account of accounts) {
  test.describe(account.profile, () => {
    test.beforeAll(async () => {
      let editedList = readJsonFile<Account[]>(account.editedPath);
      removeItems<Account>(account.data, "number", editedList);
      writeJsonFile(account.createdPath, account.data);
    });
    test.afterAll(async () => {
      let editedList = readJsonFile<Account[]>(account.editedPath);
      removeItems<Account>(account.data, "number", editedList);
      writeJsonFile(account.createdPath, account.data);
    });
    for (const created of account.data) {
      test(`Edit account ${created.account}`, async ({
        page,
        loginPage,
        homePage,
        profilePage,
        editProfilePage,
      }) => {
        try {
          await loginPage.goto("https://store.steampowered.com/login");
          await loginPage.login(created.account, created.password);
          await homePage.goToProfilePage();
          await profilePage.goToSetupSteamProfile();
          await editProfilePage.editProfile(
            created.number.toString(),
            created.avatar
          );
          await editProfilePage.logout();
          updateJsonFile(account.editedPath, created);
        } catch (error) {
          throw error;
        }
      });
    }
  });
}

// test.describe("Profile 2", () => {
//   let hasFailed: boolean = false;
//   test.beforeAll(async () => {
//     let editedList = readJsonFile<Account[]>(
//       "data/edited-account/edited-2.json"
//     );
//     removeItems<Account>(created2, "number", editedList);
//     writeJsonFile("data/created-account/created-2.json", created2);
//   });
//   test.afterAll(async () => {
//     let editedList = readJsonFile<Account[]>(
//       "data/edited-account/edited-2.json"
//     );
//     removeItems<Account>(created2, "number", editedList);
//     writeJsonFile("data/created-account/created-2.json", created2);
//   });
//   for (const account of created2) {
//     test(`Edit account ${account.account}`, async ({
//       page,
//       loginPage,
//       homePage,
//       profilePage,
//       editProfilePage,
//     }) => {
//       try {
//         await loginPage.goto("https://store.steampowered.com/login");
//         await loginPage.login(account.account, account.password);
//         await homePage.goToProfilePage();
//         await profilePage.goToSetupSteamProfile();
//         await editProfilePage.editProfile(
//           account.number.toString(),
//           account.avatar
//         );
//         await editProfilePage.logout();
//         updateJsonFile("data/edited-account/edited-2.json", account);
//       } catch (error) {
//         hasFailed = true;
//         throw error;
//       }
//     });
//   }
// });

// test.describe("Profile 3", () => {
//   let hasFailed: boolean = false;
//   test.beforeAll(async () => {
//     let editedList = readJsonFile<Account[]>(
//       "data/edited-account/edited-3.json"
//     );
//     removeItems<Account>(created3, "number", editedList);
//     writeJsonFile("data/created-account/created-3.json", created3);
//   });
//   test.afterAll(async () => {
//     let editedList = readJsonFile<Account[]>(
//       "data/edited-account/edited-3.json"
//     );
//     removeItems<Account>(created3, "number", editedList);
//     writeJsonFile("data/created-account/created-3.json", created3);
//   });
//   for (const account of created3) {
//     test(`Edit account ${account.account}`, async ({
//       page,
//       loginPage,
//       homePage,
//       profilePage,
//       editProfilePage,
//     }) => {
//       try {
//         await loginPage.goto("https://store.steampowered.com/login");
//         await loginPage.login(account.account, account.password);
//         await homePage.goToProfilePage();
//         await profilePage.goToSetupSteamProfile();
//         await editProfilePage.editProfile(
//           account.number.toString(),
//           account.avatar
//         );
//         await editProfilePage.logout();
//         updateJsonFile("data/edited-account/edited-3.json", account);
//       } catch (error) {
//         hasFailed = true;
//         throw error;
//       }
//     });
//   }
// });

// test.describe("Profile 4", () => {
//   let hasFailed: boolean = false;
//   test.beforeAll(async () => {
//     let editedList = readJsonFile<Account[]>(
//       "data/edited-account/edited-4.json"
//     );
//     removeItems<Account>(created4, "number", editedList);
//     writeJsonFile("data/created-account/created-4.json", created4);
//   });
//   test.afterAll(async () => {
//     let editedList = readJsonFile<Account[]>(
//       "data/edited-account/edited-4.json"
//     );
//     removeItems<Account>(created4, "number", editedList);
//     writeJsonFile("data/created-account/created-4.json", created4);
//   });
//   for (const account of created4) {
//     test(`Edit account ${account.account}`, async ({
//       page,
//       loginPage,
//       homePage,
//       profilePage,
//       editProfilePage,
//     }) => {
//       try {
//         await loginPage.goto("https://store.steampowered.com/login");
//         await loginPage.login(account.account, account.password);
//         await homePage.goToProfilePage();
//         await profilePage.goToSetupSteamProfile();
//         await editProfilePage.editProfile(
//           account.number.toString(),
//           account.avatar
//         );
//         await editProfilePage.logout();
//         updateJsonFile("data/edited-account/edited-4.json", account);
//       } catch (error) {
//         hasFailed = true;
//         throw error;
//       }
//     });
//   }
// });
