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
exports.importPermissionsByQuery = void 0;
const fs_1 = require("fs");
const logger_1 = require("../utils/logger");
const importPermissionsByQuery = (directus, query, sourceFile) => __awaiter(void 0, void 0, void 0, function* () {
    if (!directus) {
        (0, logger_1.log)('directus instance missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    if (!query) {
        (0, logger_1.log)('query missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    if (!sourceFile) {
        (0, logger_1.log)('sourceFile missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    (0, logger_1.log)(`Importing permissions from ${sourceFile}`, logger_1.Level.INFO);
    try {
        const permissionsBuffer = (0, fs_1.readFileSync)(sourceFile);
        const permissionsToImport = JSON.parse(permissionsBuffer.toString());
        try {
            const existingPermissionsResponse = yield directus.permissions.readByQuery(query);
            const existingPermissions = existingPermissionsResponse.data &&
                existingPermissionsResponse.data.length > 0
                ? existingPermissionsResponse === null || existingPermissionsResponse === void 0 ? void 0 : existingPermissionsResponse.data
                : [];
            const updatedPermissions = [];
            for (const permissionToImport of permissionsToImport) {
                const existingPermission = existingPermissions === null || existingPermissions === void 0 ? void 0 : existingPermissions.find((permission) => permission.collection === permissionToImport.collection &&
                    permission.action === permissionToImport.action);
                if (existingPermission) {
                    // updating existing permission
                    (0, logger_1.log)(`Updating existing permission for ${permissionToImport.collection} (action: ${permissionToImport.action})`, logger_1.Level.INFO);
                    yield directus.permissions.updateOne(existingPermission.id, permissionToImport);
                    updatedPermissions.push(existingPermission);
                    (0, logger_1.log)(`Successfully updated existing permission (id: ${existingPermission.id}) for ${permissionToImport.collection} (action: ${permissionToImport.action})`, logger_1.Level.SUCCESS);
                }
                else {
                    (0, logger_1.log)(`Creating new permission for ${permissionToImport.collection} (action: ${permissionToImport.action})`, logger_1.Level.INFO);
                    const newPermission = yield directus.permissions.createOne(permissionToImport);
                    (0, logger_1.log)(`Successfully created permission (id: ${newPermission === null || newPermission === void 0 ? void 0 : newPermission.id}) for ${permissionToImport.collection} (action: ${permissionToImport.action})`, logger_1.Level.SUCCESS);
                }
            }
            // Delete permissions which don't exist anymore
            const permissionsToRemove = existingPermissions === null || existingPermissions === void 0 ? void 0 : existingPermissions.filter((existingPermission) => !updatedPermissions.some((updatedPermission) => existingPermission.id === updatedPermission.id));
            if (permissionsToRemove && permissionsToRemove.length > 0) {
                const permissionsToRemoveIds = permissionsToRemove.map((permissionToRemove) => permissionToRemove.id);
                (0, logger_1.log)(`Removing outdated permissions [${permissionsToRemove
                    .map((permissionToRemove) => `${permissionToRemove.collection} (action: ${permissionToRemove.action}) (id: ${permissionToRemove.id})`)
                    .join(', ')}]`, logger_1.Level.INFO);
                yield directus.permissions.deleteMany(permissionsToRemoveIds);
                (0, logger_1.log)('Successfully removed outdated permissions', logger_1.Level.SUCCESS);
            }
        }
        catch (error) {
            (0, logger_1.log)(`Failed to import permissions: ${error}`, logger_1.Level.ERROR);
        }
    }
    catch (error) {
        (0, logger_1.log)(`Error while reading ${sourceFile}: ${error}`, logger_1.Level.ERROR);
    }
});
exports.importPermissionsByQuery = importPermissionsByQuery;
