"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportPreset = void 0;
const fs_1 = require("fs");
const logger_1 = require("../utils/logger");
const helper_1 = require("./helper");
const exportPreset = (directus, collection, preset, targetFile) => __awaiter(void 0, void 0, void 0, function* () {
    if (!directus) {
        (0, logger_1.log)('directus instance missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    if (!collection) {
        (0, logger_1.log)('collection missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    if (!preset) {
        (0, logger_1.log)('preset missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    if (!targetFile) {
        (0, logger_1.log)('targetFile missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    (0, logger_1.log)(`Exporting preset ${preset} for collection ${collection}`, logger_1.Level.INFO);
    try {
        const presetData = yield (0, helper_1.getPresetForCollection)(directus, collection, preset);
        if (!presetData) {
            (0, logger_1.log)(`Preset ${preset} not found for ${collection}`, logger_1.Level.WARN);
            return;
        }
        else {
            // Remove id column from presets
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id } = presetData, presetWithoutId = __rest(presetData, ["id"]);
            try {
                (0, fs_1.writeFileSync)(targetFile, JSON.stringify(presetWithoutId, null, 2));
                (0, logger_1.log)(`Successfully exported default preset to ${targetFile}`, logger_1.Level.SUCCESS);
            }
            catch (error) {
                (0, logger_1.log)(`Error while writing ${targetFile}: ${error}`, logger_1.Level.ERROR);
            }
        }
    }
    catch (error) {
        (0, logger_1.log)(`Failed to export default preset: ${error}`, logger_1.Level.ERROR);
    }
});
exports.exportPreset = exportPreset;
