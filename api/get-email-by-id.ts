import { APIRequestContext, request } from "@playwright/test";

export type EmailPart = {
  partId: string;
  mimeType: string;
  filename: string;
  headers: {
    name: string;
    value: string;
  }[];
  body: {
    attachmentId?: string;
    size: number;
    data: string;
  };
  parts: EmailPart[];
};

export type Email = {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  historyId: string;
  internalDate: string;
  payload: EmailPart;
  sizeEstimate: number;
  raw?: string;
};

export const getEmailById = async (
  token: string,
  id: string
): Promise<Email> => {
  const apiContext: APIRequestContext = await request.newContext();
  const url = new URL(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`
  );

  url.searchParams.set("format", "full");

  const response = await apiContext.get(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 15000,
  });

  if (response.ok()) {
    const data = (await response.json()) as Email;
    return data;
  } else {
    throw new Error(`Failed to fetch emails. Status: ${response.status()}`);
  }
};
