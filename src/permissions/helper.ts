import { IDirectus, TypeMap } from '@directus/sdk';

export const publicPermissionsQuery = {
  limit: -1,
  filter: {
    role: {
      _null: true,
    },
  },
};

export const getRoleIdByName = async (
  directus: IDirectus<TypeMap>,
  rolename: string
) => {
  const roleByName = await directus.roles.readByQuery({
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
};

export const getPermissionsByRoleIdQuery = (roleId: string) => ({
  limit: -1,
  filter: {
    role: roleId,
  },
});
