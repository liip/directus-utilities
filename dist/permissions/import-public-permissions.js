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
exports.importPublicPermissions = void 0;
const logger_1 = require("../utils/logger");
const helper_1 = require("./helper");
const import_permissions_by_query_1 = require("./import-permissions-by-query");
const importPublicPermissions = (directus, sourceFile) => __awaiter(void 0, void 0, void 0, function* () {
    if (!directus) {
        (0, logger_1.log)('directus instance missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    if (!sourceFile) {
        (0, logger_1.log)('sourceFile missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    (0, logger_1.log)(`Importing public permissions from ${sourceFile}`, logger_1.Level.INFO);
    yield (0, import_permissions_by_query_1.importPermissionsByQuery)(directus, helper_1.publicPermissionsQuery, sourceFile, null);
});
exports.importPublicPermissions = importPublicPermissions;
