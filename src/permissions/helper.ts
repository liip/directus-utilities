import { IDirectus, TypeMap } from '@directus/sdk';

export const getPublicPermissions = async (directus: IDirectus<TypeMap>) => {
  const permissions = await directus.permissions.readByQuery({
    limit: -1,
    filter: {
      role: {
        _null: true,
      },
    },
  });
  return permissions.data && permissions.data?.length > 0
    ? permissions.data
    : null;
};
