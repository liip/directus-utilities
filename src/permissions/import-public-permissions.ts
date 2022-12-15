import { IDirectus, TypeMap } from '@directus/sdk';
import { log, Level } from '../utils/logger';
import { publicPermissionsQuery } from './helper';
import { importPermissionsByQuery } from './import-permissions-by-query';

export const importPublicPermissions = async (
  directus: IDirectus<TypeMap>,
  sourceFile: string
) => {
  if (!directus) {
    log(
      'directus instance missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }
  if (!sourceFile) {
    log(
      'sourceFile missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }

  log(`Importing public permissions from ${sourceFile}`, Level.INFO);
  await importPermissionsByQuery(
    directus,
    publicPermissionsQuery,
    sourceFile,
    null
  );
};
