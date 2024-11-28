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
