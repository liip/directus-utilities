import { IDirectus, TypeMap } from '@directus/sdk';
import { log, Level } from '../utils/logger';
import { exportPermissionsByQuery } from './export-permissions-by-query';
import { getPermissionsByRoleIdQuery, getRoleIdByName } from './helper';

export const exportPermissionsByRolename = async (
  directus: IDirectus<TypeMap>,
  rolename: string,
  targetFile: string
) => {
  if (!directus) {
    log(
      'directus instance missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }
  if (!rolename) {
    log(
      'rolename missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }
  if (!targetFile) {
    log(
      'targetFile missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }

  log(`Exporting permissions for role ${rolename}`, Level.INFO);
  const roleId = await getRoleIdByName(directus, rolename);
  if (roleId) {
    await exportPermissionsByQuery(
      directus,
      getPermissionsByRoleIdQuery(roleId),
      targetFile
    );
  } else {
    log(`Role with name ${rolename} not found`, Level.ERROR);
  }
};
