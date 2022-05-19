"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.Level = void 0;
const chalk_1 = __importDefault(require("chalk"));
var Level;
(function (Level) {
    Level["INFO"] = "INFO";
    Level["SUCCESS"] = "SUCCESS";
    Level["WARN"] = "WARN";
    Level["ERROR"] = "ERROR";
})(Level = exports.Level || (exports.Level = {}));
const levelToChalkColorMap = {
    [Level.SUCCESS]: chalk_1.default.green,
    [Level.INFO]: chalk_1.default.blue,
    [Level.WARN]: chalk_1.default.yellow,
    [Level.ERROR]: chalk_1.default.red,
};
const log = (message, level) => {
    console.log(levelToChalkColorMap[level](message));
};
exports.log = log;
