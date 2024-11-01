import { test } from "../fixture/page-fixture";
import {
  clearJsonFile,
  readJsonFile,
  removeItem,
  removeItems,
  removeStringItems,
  updateJsonFile,
  writeJsonFile,
} from "../core/utils/json-helper";
import { Account } from "../core/models/types";
import { profileDataProvider } from "../utils/data-provider/data-provider";

// const queueList_1 = readJsonFile<{ id: number; url: string }[]>(
//   "data/combined/combined-1.json"
// );
// const queueList_2 = readJsonFile<{ id: number; url: string }[]>(
//   "data/combined/combined-2.json"
// );
// const queueList_3 = readJsonFile<{ id: number; url: string }[]>(
//   "data/combined/combined-3.json"
// );
// const queueList_4 = readJsonFile<{ id: number; url: string }[]>(
//   "data/combined/combined-4.json"
// );

// let accountList_1 = readJsonFile<Account[]>("data/account/account-1.json");
// let accountList_2 = readJsonFile<Account[]>("data/account/account-2.json");
// let accountList_3 = readJsonFile<Account[]>("data/account/account-3.json");
// let accountList_4 = readJsonFile<Account[]>("data/account/account-4.json");
// let urlList_1 = readJsonFile<string[]>("data/url/url-1.json");
// let urlList_2 = readJsonFile<string[]>("data/url/url-2.json");
// let urlList_3 = readJsonFile<string[]>("data/url/url-3.json");

// const profiles = [
//   {
//     profile: "Profile 1",
//     queueData: queueList_1,
//     accountData: accountList_1,
//     accountPath: "data/account/account-1.json",
//     createdPath: "data/created-account/created-1.json",
//   },
//   {
//     profile: "Profile 2",
//     queueData: queueList_2,
//     accountData: accountList_2,
//     accountPath: "data/account/account-2.json",
//     createdPath: "data/created-account/created-2.json",
//   },
//   {
//     profile: "Profile 3",
//     queueData: queueList_3,
//     accountData: accountList_3,
//     accountPath: "data/account/account-3.json",
//     createdPath: "data/created-account/created-3.json",
//   },
//   {
//     profile: "Profile 4",
//     queueData: queueList_4,
//     accountData: accountList_4,
//     accountPath: "data/account/account-4.json",
//     createdPath: "data/created-account/created-4.json",
//   },
// ];

test.beforeEach(async ({ page, loginPage }) => {
  await loginPage.delay(5000);
});

for (const profile of profileDataProvider) {
  test.describe(profile.profile, () => {
    test.beforeAll(async () => {
      const createdData = readJsonFile<Account[]>(profile.paths.created);
      removeItems<Account>(profile.accountData, "number", createdData);
      writeJsonFile(profile.paths.account, profile.accountData);
    });
    test.afterAll(async () => {
      const createdData = readJsonFile<Account[]>(profile.paths.created);
      removeItems<Account>(profile.accountData, "number", createdData);
      writeJsonFile(profile.paths.account, profile.accountData);
    });
    for (const data of profile.queueData) {
      test(`Create account ${data.id}`, async ({
        page,
        createAccountSecondPage,
        homePage,
      }) => {
        try {
          const account = profile.accountData.find(
            (item) => item.number === data.id.toString()
          );
          await createAccountSecondPage.goto(data.url);
          await createAccountSecondPage.createAccount(
            account ? account.account : "",
            account ? account.password : ""
          );
          await homePage.verifyAccountCreated();
          updateJsonFile(profile.paths.created, account);
        } catch (error) {
          throw error;
        }
      });
    }
  });
}

// test.describe("Profile 2", () => {
//   let hasFailed: boolean = false;
//   test.afterAll(async () => {
//     if (!hasFailed) {
//       let createdList = readJsonFile<Account[]>(
//         "data/created-account/created-2.json"
//       );
//       removeItems<Account>(accountList_2, "number", createdList);
//       writeJsonFile("data/account/account-2.json", accountList_2);
//     }
//   });
//   for (const data of queueList_2) {
//     test(`Create account ${data.id}`, async ({
//       page,
//       createAccountSecondPage,
//       homePage,
//     }) => {
//       try {
//         const account = accountList_2.find(
//           (item) => item.number === data.id.toString()
//         );
//         await createAccountSecondPage.goto(data.url);
//         await createAccountSecondPage.createAccount(
//           account ? account.account : "",
//           account ? account.password : ""
//         );
//         await homePage.verifyAccountCreated();
//         updateJsonFile("data/created-account/created-2.json", account);
//       } catch (error) {
//         hasFailed = true;
//         throw error;
//       }
//     });
//   }
// });

// test.describe("Profile 3", () => {
//   let hasFailed: boolean = false;
//   test.afterAll(async () => {
//     if (!hasFailed) {
//       let createdList = readJsonFile<Account[]>(
//         "data/created-account/created-3.json"
//       );
//       removeItems<Account>(accountList_3, "number", createdList);
//       writeJsonFile("data/account/account-3.json", accountList_3);
//     }
//   });
//   for (const data of queueList_3) {
//     test(`Create account ${data.id}`, async ({
//       page,
//       createAccountSecondPage,
//       homePage,
//     }) => {
//       try {
//         const account = accountList_3.find(
//           (item) => item.number === data.id.toString()
//         );
//         await createAccountSecondPage.goto(data.url);
//         await createAccountSecondPage.createAccount(
//           account ? account.account : "",
//           account ? account.password : ""
//         );
//         await homePage.verifyAccountCreated();
//         updateJsonFile("data/created-account/created-3.json", account);
//       } catch (error) {
//         hasFailed = true;
//         throw error;
//       }
//     });
//   }
// });

// test.describe("Profile 4", () => {
//   let hasFailed: boolean = false;
//   test.afterAll(async () => {
//     if (!hasFailed) {
//       let createdList = readJsonFile<Account[]>(
//         "data/created-account/created-4.json"
//       );
//       removeItems<Account>(accountList_4, "number", createdList);
//       writeJsonFile("data/account/account-4.json", accountList_4);
//     }
//   });
//   for (const data of queueList_4) {
//     test(`Create account ${data.id}`, async ({
//       page,
//       createAccountSecondPage,
//       homePage,
//     }) => {
//       try {
//         const account = accountList_4.find(
//           (item) => item.number === data.id.toString()
//         );
//         await createAccountSecondPage.goto(data.url);
//         await createAccountSecondPage.createAccount(
//           account ? account.account : "",
//           account ? account.password : ""
//         );
//         await homePage.verifyAccountCreated();
//         updateJsonFile("data/created-account/created-4.json", account);
//       } catch (error) {
//         hasFailed = true;
//         throw error;
//       }
//     });
//   }
// });
