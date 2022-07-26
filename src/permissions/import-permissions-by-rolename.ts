import { IDirectus, TypeMap } from '@directus/sdk';
import { log, Level } from '../utils/logger';
import { getPermissionsByRolenameQuery } from './helper';
import { importPermissionsByQuery } from './import-permissions-by-query';

export const importPermissionsByRolename = async (
  directus: IDirectus<TypeMap>,
  rolename: string,
  sourceFile: string
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
  if (!sourceFile) {
    log(
      'sourceFile missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }

  log(`Importing permissions for role ${rolename}`, Level.INFO);
  await importPermissionsByQuery(
    directus,
    getPermissionsByRolenameQuery(rolename),
    sourceFile
  );
};
