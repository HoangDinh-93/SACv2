import { ProfilePaths } from "../core/models/types";
import { getAbsolutePath } from "../core/utils/path-helper";

export class PathConstants {
  static readonly PATH_TO_IMAGE = getAbsolutePath("asset/avatar/");
}

export const profilePath = (num: number) => {
  return {
    account: `data/account/account-${num}.json`,
    queue: `data/combined/combined-${num}.json`,
    created: `data/created-account/created-${num}.json`,
    edited: `data/edited-account/edited-${num}.json`,
  };
};

export const profilePaths = {
  profile_1: {
    account: "data/account/account-1.json",
    queue: "data/combined/combined-1.json",
    created: "data/created-account/created-1.json",
    edited: "data/edited-account/edited-1.json",
  },
  profile_2: {
    account: "data/account/account-2.json",
    queue: "data/combined/combined-2.json",
    created: "data/created-account/created-2.json",
    edited: "data/edited-account/edited-2.json",
  },
  profile_3: {
    account: "data/account/account-3.json",
    queue: "data/combined/combined-3.json",
    created: "data/created-account/created-3.json",
    edited: "data/edited-account/edited-3.json",
  },
  profile_4: {
    account: "data/account/account-4.json",
    queue: "data/combined/combined-4.json",
    created: "data/created-account/created-4.json",
    edited: "data/edited-account/edited-4.json",
  },
  profile_5: {
    account: "data/account/account-5.json",
    queue: "data/combined/combined-5.json",
    created: "data/created-account/created-5.json",
    edited: "data/edited-account/edited-5.json",
  },
  profile_6: {
    account: "data/account/account-6.json",
    queue: "data/combined/combined-6.json",
    created: "data/created-account/created-6.json",
    edited: "data/edited-account/edited-6.json",
  },
  profile_7: {
    account: "data/account/account-7.json",
    queue: "data/combined/combined-7.json",
    created: "data/created-account/created-7.json",
    edited: "data/edited-account/edited-7.json",
  },
  profile_8: {
    account: "data/account/account-8.json",
    queue: "data/combined/combined-8.json",
    created: "data/created-account/created-8.json",
    edited: "data/edited-account/edited-8.json",
  },
  profile_9: {
    account: "data/account/account-9.json",
    queue: "data/combined/combined-9.json",
    created: "data/created-account/created-9.json",
    edited: "data/edited-account/edited-9.json",
  },
  profile_10: {
    account: "data/account/account-10.json",
    queue: "data/combined/combined-10.json",
    created: "data/created-account/created-10.json",
    edited: "data/edited-account/edited-10.json",
  },
  profile_11: {
    account: "data/account/account-11.json",
    queue: "data/combined/combined-11.json",
    created: "data/created-account/created-11.json",
    edited: "data/edited-account/edited-11.json",
  },
  profile_12: {
    account: "data/account/account-12.json",
    queue: "data/combined/combined-12.json",
    created: "data/created-account/created-12.json",
    edited: "data/edited-account/edited-12.json",
  },
  profile_13: {
    account: "data/account/account-13.json",
    queue: "data/combined/combined-13.json",
    created: "data/created-account/created-13.json",
    edited: "data/edited-account/edited-13.json",
  },
  profile_14: {
    account: "data/account/account-14.json",
    queue: "data/combined/combined-14.json",
    created: "data/created-account/created-14.json",
    edited: "data/edited-account/edited-14.json",
  },
  profile_15: {
    account: "data/account/account-15.json",
    queue: "data/combined/combined-15.json",
    created: "data/created-account/created-15.json",
    edited: "data/edited-account/edited-15.json",
  },
};
