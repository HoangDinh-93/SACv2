export type Account = {
  number: string;
  account: string;
  password: string;
  email: string;
  emailPassword: string;
  avatar: string;
};

export type Profile = {
  account: string;
  queue: string;
  created: string;
  edited: string;
};

export type ProfilePaths = {
  [key: string]: Profile;
};
