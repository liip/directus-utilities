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
exports.exportPermissionsByQuery = void 0;
const fs_1 = require("fs");
const logger_1 = require("../utils/logger");
const exportPermissionsByQuery = (directus, query, targetFile, propertiesToRemove = ['id']) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!directus) {
        (0, logger_1.log)('directus instance missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    if (!query) {
        (0, logger_1.log)('query missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    if (!targetFile) {
        (0, logger_1.log)('targetFile missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    (0, logger_1.log)('Exporting permissions', logger_1.Level.INFO);
    try {
        const permissionsResponse = yield directus.permissions.readByQuery(query);
        const permissions = permissionsResponse.data && ((_a = permissionsResponse.data) === null || _a === void 0 ? void 0 : _a.length) > 0
            ? permissionsResponse.data
            : null;
        if (!permissions) {
            (0, logger_1.log)('No permissions found', logger_1.Level.WARN);
            return;
        }
        else {
            // Remove unused properties from permission
            const permissionsWithRemovedProperties = permissions.map((permission) => {
                const permissionWithRemovedProperties = Object.assign({}, permission);
                propertiesToRemove.forEach((propertyToRemove) => {
                    delete permissionWithRemovedProperties[propertyToRemove];
                });
                return permissionWithRemovedProperties;
            });
            try {
                (0, fs_1.writeFileSync)(targetFile, JSON.stringify(permissionsWithRemovedProperties, null, 2));
                (0, logger_1.log)('Successfully exported permissions', logger_1.Level.SUCCESS);
            }
            catch (error) {
                (0, logger_1.log)(`Error while writing ${targetFile}: ${error}`, logger_1.Level.ERROR);
            }
        }
    }
    catch (error) {
        (0, logger_1.log)(`Failed to export permission: ${error}`, logger_1.Level.ERROR);
    }
});
exports.exportPermissionsByQuery = exportPermissionsByQuery;
