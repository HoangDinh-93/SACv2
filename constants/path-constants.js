"use strict";
exports.__esModule = true;
exports.profilePaths = exports.PathConstants = void 0;
var path_helper_1 = require("../core/utils/path-helper");
var PathConstants = /** @class */ (function () {
    function PathConstants() {
    }
    PathConstants.PATH_TO_IMAGE = (0, path_helper_1.getAbsolutePath)("asset/avatar/");
    return PathConstants;
}());
exports.PathConstants = PathConstants;
exports.profilePaths = {
    profile_1: {
        account: "data/account/account-1.json",
        queue: "data/combined/combined-1.json",
        created: "data/created-account/created-1.json",
        edited: "data/edited-account/edited-1.json"
    },
    profile_2: {
        account: "data/account/account-2.json",
        queue: "data/combined/combined-2.json",
        created: "data/created-account/created-2.json",
        edited: "data/edited-account/edited-2.json"
    },
    profile_3: {
        account: "data/account/account-3.json",
        queue: "data/combined/combined-3.json",
        created: "data/created-account/created-3.json",
        edited: "data/edited-account/edited-3.json"
    },
    profile_4: {
        account: "data/account/account-4.json",
        queue: "data/combined/combined-4.json",
        created: "data/created-account/created-4.json",
        edited: "data/edited-account/edited-4.json"
    }
};
