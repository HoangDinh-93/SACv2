"use strict";
exports.__esModule = true;
exports.removeStringItems = exports.removeItems = exports.removeItem = exports.clearJsonFile = exports.updateJsonFile = exports.writeJsonFile = exports.readJsonFile = void 0;
var fs = require("fs");
var path_helper_1 = require("./path-helper");
var readJsonFile = function (filePath) {
    var absolutePath = (0, path_helper_1.getAbsolutePath)(filePath);
    var fileContent = fs.readFileSync(absolutePath, "utf-8");
    var jsonData = JSON.parse(fileContent);
    return jsonData;
};
exports.readJsonFile = readJsonFile;
var writeJsonFile = function (filePath, data) {
    var absolutePath = (0, path_helper_1.getAbsolutePath)(filePath);
    var jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(absolutePath, jsonData, "utf-8");
};
exports.writeJsonFile = writeJsonFile;
var updateJsonFile = function (filePath, data) {
    var accountData = (0, exports.readJsonFile)(filePath);
    var existingDataSet = new Set(accountData.map(function (item) { return JSON.stringify(item); }));
    if (!existingDataSet.has(JSON.stringify(data))) {
        var result = accountData.concat(data);
        (0, exports.writeJsonFile)(filePath, result);
    }
};
exports.updateJsonFile = updateJsonFile;
var clearJsonFile = function (filePath) {
    var jsonData = [];
    (0, exports.writeJsonFile)(filePath, jsonData);
};
exports.clearJsonFile = clearJsonFile;
var removeItem = function (array, identifier, value) {
    var index = array.findIndex(function (obj) { return obj[identifier] === value; });
    if (index !== -1) {
        return array.splice(index, 1)[0];
    }
    else {
        return undefined;
    }
};
exports.removeItem = removeItem;
var removeItems = function (array, identifier, subArray) {
    subArray.forEach(function (item) {
        var index = array.findIndex(function (obj) { return obj[identifier] === item[identifier]; });
        if (index !== -1) {
            array.splice(index, 1);
        }
    });
};
exports.removeItems = removeItems;
var removeStringItems = function (array, subArray) {
    subArray.forEach(function (item) {
        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
        }
    });
};
exports.removeStringItems = removeStringItems;
