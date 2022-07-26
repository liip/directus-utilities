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
exports.getPermissionsByRoleIdQuery = exports.getRoleIdByName = exports.publicPermissionsQuery = void 0;
exports.publicPermissionsQuery = {
    limit: -1,
    filter: {
        role: {
            _null: true,
        },
    },
};
const getRoleIdByName = (directus, rolename) => __awaiter(void 0, void 0, void 0, function* () {
    const roleByName = yield directus.roles.readByQuery({
        limit: 1,
        filter: {
            name: {
                _eq: rolename,
            },
        },
    });
    if (roleByName && roleByName.data && roleByName.data.length > 0) {
        return roleByName.data[0].id;
    }
    return null;
});
exports.getRoleIdByName = getRoleIdByName;
const getPermissionsByRoleIdQuery = (roleId) => ({
    limit: -1,
    filter: {
        role: {
            _eq: roleId,
        },
    },
});
exports.getPermissionsByRoleIdQuery = getPermissionsByRoleIdQuery;
