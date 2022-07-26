import { IDirectus, TypeMap } from '@directus/sdk';
import { log, Level } from '../utils/logger';
import { exportPermissionsByQuery } from './export-permissions-by-query';
import { getPermissionsByRolenameQuery } from './helper';

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
  await exportPermissionsByQuery(
    directus,
    getPermissionsByRolenameQuery(rolename),
    targetFile
  );
};
