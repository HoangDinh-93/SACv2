"use strict";
exports.__esModule = true;
exports.joinPath = exports.getAbsolutePath = void 0;
var path = require("path");
var getAbsolutePath = function (relativePath) {
    var rootDir = path.resolve(__dirname, "../../");
    return path.resolve(rootDir, relativePath);
};
exports.getAbsolutePath = getAbsolutePath;
var joinPath = function () {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    return path.join.apply(path, paths);
};
exports.joinPath = joinPath;
