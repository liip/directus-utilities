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
exports.exportDefaultPreset = void 0;
const fs_1 = require("fs");
const logger_1 = require("./logger");
const helper_1 = require("./helper");
const exportDefaultPreset = (directus, collection, target) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logger_1.log)(`Exporting default preset for collection ${collection}`, logger_1.Level.INFO);
    try {
        const preset = yield (0, helper_1.getDefaultPresetForCollection)(directus, collection);
        if (!preset) {
            (0, logger_1.log)(`Default preset not found for ${collection}`, logger_1.Level.WARN);
            return;
        }
        else {
            const targetFile = `${target ? `${target}/` : ''}preset-${collection}.json`;
            // Remove id column from presets
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id } = preset, presetWithoutId = __rest(preset, ["id"]);
            try {
                (0, fs_1.writeFileSync)(targetFile, JSON.stringify(presetWithoutId, null, 2));
                (0, logger_1.log)(`Sucessfully exported default preset to ${targetFile}`, logger_1.Level.SUCCESS);
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
exports.exportDefaultPreset = exportDefaultPreset;
