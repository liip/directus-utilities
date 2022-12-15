import { IDirectus, TypeMap } from '@directus/sdk';
export declare const publicPermissionsQuery: {
    limit: number;
    filter: {
        role: {
            _null: boolean;
        };
    };
};
export declare const getRoleIdByName: (directus: IDirectus<TypeMap>, rolename: string) => Promise<any>;
export declare const getPermissionsByRoleIdQuery: (roleId: string) => {
    limit: number;
    filter: {
        role: string;
    };
};
