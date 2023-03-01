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
Object.defineProperty(exports, "__esModule", { value: true });
exports.importPresets = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const logger_1 = require("../utils/logger");
const helper_1 = require("./helper");
const importPresets = (directus, sourceDir) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    if (!directus) {
        (0, logger_1.log)('directus instance missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    if (!sourceDir) {
        (0, logger_1.log)('source directory missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    (0, logger_1.log)(`Importing presets from ${sourceDir}`, logger_1.Level.INFO);
    try {
        const fileNames = (0, fs_1.readdirSync)(sourceDir);
        for (const fileName of fileNames) {
            try {
                const sourceFile = (0, path_1.join)(sourceDir, fileName);
                const presetBuffer = (0, fs_1.readFileSync)(sourceFile);
                const preset = JSON.parse(presetBuffer.toString());
                try {
                    const existingPreset = yield (0, helper_1.getPresetForCollection)(directus, preset.collection, preset.bookmark);
                    if (existingPreset) {
                        // updating existing preset
                        (0, logger_1.log)(`Updating existing preset ${(_a = preset.bookmark) !== null && _a !== void 0 ? _a : 'default'} for ${preset.collection}`, logger_1.Level.INFO);
                        yield directus.presets.updateOne(existingPreset.id, preset);
                        (0, logger_1.log)(`Successfully updated existing preset ${(_b = preset.bookmark) !== null && _b !== void 0 ? _b : 'default'} (id: ${existingPreset.id}) for ${preset.collection}`, logger_1.Level.SUCCESS);
                    }
                    else {
                        (0, logger_1.log)(`Creating new preset ${(_c = preset.bookmark) !== null && _c !== void 0 ? _c : 'default'} for ${preset.collection}`, logger_1.Level.INFO);
                        const newPreset = yield directus.presets.createOne(preset);
                        (0, logger_1.log)(`Successfully created preset ${(_d = preset.bookmark) !== null && _d !== void 0 ? _d : 'default'} (id: ${newPreset === null || newPreset === void 0 ? void 0 : newPreset.id}) for ${preset.collection}`, logger_1.Level.SUCCESS);
                    }
                }
                catch (error) {
                    (0, logger_1.log)(`Failed to import preset ${fileName}: ${error}`, logger_1.Level.ERROR);
                }
            }
            catch (error) {
                (0, logger_1.log)(`Error while reading ${fileName}: ${error}`, logger_1.Level.ERROR);
            }
        }
        ;
    }
    catch (error) {
        (0, logger_1.log)(`Error while reading ${sourceDir}: ${error}`, logger_1.Level.ERROR);
    }
});
exports.importPresets = importPresets;
