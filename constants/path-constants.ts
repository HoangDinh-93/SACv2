import { ProfilePaths } from "../core/models/types";
import { getAbsolutePath } from "../core/utils/path-helper";

export class PathConstants {
  static readonly PATH_TO_IMAGE = getAbsolutePath("asset/avatar/");
}

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
};
