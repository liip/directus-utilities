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
exports.importDefaultPreset = void 0;
const fs_1 = require("fs");
const logger_1 = require("../utils/logger");
const helper_1 = require("./helper");
const importDefaultPreset = (directus, collection, sourceFile) => __awaiter(void 0, void 0, void 0, function* () {
    if (!directus) {
        (0, logger_1.log)('directus instance missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    if (!collection) {
        (0, logger_1.log)('collection missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    if (!sourceFile) {
        (0, logger_1.log)('sourceFile missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    (0, logger_1.log)(`Importing default preset for ${collection} from ${sourceFile}`, logger_1.Level.INFO);
    try {
        const presetBuffer = (0, fs_1.readFileSync)(sourceFile);
        const preset = JSON.parse(presetBuffer.toString());
        try {
            const existingPreset = yield (0, helper_1.getDefaultPresetForCollection)(directus, collection);
            if (existingPreset) {
                // updating existing preset
                (0, logger_1.log)(`Updating existing preset for ${collection}`, logger_1.Level.INFO);
                yield directus.presets.updateOne(existingPreset.id, preset);
                (0, logger_1.log)(`Successfully updated existing default preset (id: ${existingPreset.id}) for ${collection}`, logger_1.Level.SUCCESS);
            }
            else {
                (0, logger_1.log)(`Creating new preset for ${collection}`, logger_1.Level.INFO);
                const newPreset = yield directus.presets.createOne(preset);
                (0, logger_1.log)(`Successfully created default preset (id: ${newPreset === null || newPreset === void 0 ? void 0 : newPreset.id}) for ${collection}`, logger_1.Level.SUCCESS);
            }
        }
        catch (error) {
            (0, logger_1.log)(`Failed to import preset: ${error}`, logger_1.Level.ERROR);
        }
    }
    catch (error) {
        (0, logger_1.log)(`Error while reading ${sourceFile}: ${error}`, logger_1.Level.ERROR);
    }
});
exports.importDefaultPreset = importDefaultPreset;
