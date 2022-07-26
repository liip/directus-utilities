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
exports.exportPublicPermissions = void 0;
const logger_1 = require("../utils/logger");
const export_permissions_by_query_1 = require("./export-permissions-by-query");
const helper_1 = require("./helper");
const exportPublicPermissions = (directus, targetFile) => __awaiter(void 0, void 0, void 0, function* () {
    if (!directus) {
        (0, logger_1.log)('directus instance missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    if (!targetFile) {
        (0, logger_1.log)('targetFile missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    (0, logger_1.log)('Exporting public permissions', logger_1.Level.INFO);
    yield (0, export_permissions_by_query_1.exportPermissionsByQuery)(directus, helper_1.publicPermissionsQuery, targetFile);
});
exports.exportPublicPermissions = exportPublicPermissions;
