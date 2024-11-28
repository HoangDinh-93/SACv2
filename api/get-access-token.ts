import { APIRequestContext, request } from "@playwright/test";

export async function getAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string
): Promise<string> {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);
  params.append("refresh_token", refreshToken);

  const apiContext: APIRequestContext = await request.newContext();
  const response = await apiContext.post(
    "https://accounts.google.com/o/oauth2/token",
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: params.toString(),
    }
  );

  if (response.ok()) {
    const responseBody = await response.json();
    return responseBody.access_token as string;
  } else {
    throw new Error(`Failed to get access token. Status: ${response.status()}`);
  }
}
