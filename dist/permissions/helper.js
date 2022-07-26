"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermissionsByRolenameQuery = exports.publicPermissionsQuery = void 0;
exports.publicPermissionsQuery = {
    limit: -1,
    filter: {
        role: {
            _null: true,
        },
    },
};
const getPermissionsByRolenameQuery = (rolename) => ({
    limit: -1,
    filter: {
        role: {
            name: {
                _eq: rolename,
            },
        },
    },
});
exports.getPermissionsByRolenameQuery = getPermissionsByRolenameQuery;
