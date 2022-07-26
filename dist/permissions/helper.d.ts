export declare const publicPermissionsQuery: {
    limit: number;
    filter: {
        role: {
            _null: boolean;
        };
    };
};
export declare const getPermissionsByRolenameQuery: (rolename: string) => {
    limit: number;
    filter: {
        role: {
            name: {
                _eq: string;
            };
        };
    };
};
