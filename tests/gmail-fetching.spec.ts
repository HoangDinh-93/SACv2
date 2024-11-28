import { test, expect } from "@playwright/test";
import { request } from "@playwright/test";
import { getAccessToken } from "../api/get-access-token";
import { readJsonFile } from "../core/utils/json-helper";
import { getEmailList } from "../api/get-email-list";
import { checkInbox, Email, parseHtmlFromEmail } from "gmail-getter";
import { getEmailById } from "../api/get-email-by-id";

type clientData = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};
const credentials = readJsonFile<clientData>("configuration/client-data.json");
test("Get OAuth2 token", async ({ request }) => {
  const clientId: string = credentials.clientId;
  const clientSecret: string = credentials.clientSecret;
  const refreshToken: string = credentials.refreshToken;
  let accessToken: string = await getAccessToken(
    clientId,
    clientSecret,
    refreshToken
  );

  console.log(accessToken);

  // let messages = await getEmailList(
  //   "ya29.a0AeDClZBvqm8hkOgMqYYoa4tAQCcb2ckkC7L2nz9p4Rhuknw3xUOliIW59hdW9MoIvO2UIXYBuRLYE8rQE8uzRtxhDlli7viLmN8bLBCCDX8yInJudxyO8xFpwWg6vL7e9s0vMTO4HJZlznDf5T45-kkzDBXm100GimqrUaDKjQaCgYKAZkSARISFQHGX2MiZMsIUXJj7GUxUcYpHpP1eg0177",
  //   "subject: New Steam Account Email Verification"
  // );

  const email = await getEmailById(accessToken, "192f6e712af83732");
  console.log(email);
});
