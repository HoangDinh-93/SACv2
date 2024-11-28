import { APIRequestContext, request } from "@playwright/test";

export type Message = {
  id: string;
  threadId: string;
};

export type EmailsList = {
  messages?: Message[];
  nextPageToken?: string;
  resultSizeEstimate: number;
};

export const getEmailList = async (
  token: string,
  query: string
): Promise<Message[]> => {
  const apiContext: APIRequestContext = await request.newContext();
  const url = new URL(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages"
  );
  if (query) {
    url.searchParams.set("q", query);
  }

  const response = await apiContext.get(url.toString(), {
    headers: {
      Authorization: `OAuth ${token}`,
    },
    timeout: 15000,
  });

  if (response.ok()) {
    const data = await response.json();
    console.log(data.messages);
    return data.messages;
  } else {
    throw new Error(`Failed to fetch emails. Status: ${response.status()}`);
  }
};
