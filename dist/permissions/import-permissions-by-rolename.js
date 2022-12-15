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
exports.importPermissionsByRolename = void 0;
const logger_1 = require("../utils/logger");
const helper_1 = require("./helper");
const import_permissions_by_query_1 = require("./import-permissions-by-query");
const importPermissionsByRolename = (directus, rolename, sourceFile) => __awaiter(void 0, void 0, void 0, function* () {
    if (!directus) {
        (0, logger_1.log)('directus instance missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    if (!rolename) {
        (0, logger_1.log)('rolename missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    if (!sourceFile) {
        (0, logger_1.log)('sourceFile missing. Please provide it when calling the function.', logger_1.Level.ERROR);
    }
    (0, logger_1.log)(`Importing permissions for role ${rolename}`, logger_1.Level.INFO);
    const roleId = yield (0, helper_1.getRoleIdByName)(directus, rolename);
    if (roleId) {
        yield (0, import_permissions_by_query_1.importPermissionsByQuery)(directus, (0, helper_1.getPermissionsByRoleIdQuery)(roleId), sourceFile, roleId);
    }
    else {
        (0, logger_1.log)(`Role with name ${rolename} not found`, logger_1.Level.ERROR);
    }
});
exports.importPermissionsByRolename = importPermissionsByRolename;
