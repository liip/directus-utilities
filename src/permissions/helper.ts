export const publicPermissionsQuery = {
  limit: -1,
  filter: {
    role: {
      _null: true,
    },
  },
};

export const getPermissionsByRolenameQuery = (rolename: string) => ({
  limit: -1,
  filter: {
    role: {
      name: {
        _eq: rolename,
      },
    },
  },
});
