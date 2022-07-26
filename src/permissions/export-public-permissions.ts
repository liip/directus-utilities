import { IDirectus, TypeMap } from '@directus/sdk';
import { log, Level } from '../utils/logger';
import { exportPermissionsByQuery } from './export-permissions-by-query';
import { publicPermissionsQuery } from './helper';

export const exportPublicPermissions = async (
  directus: IDirectus<TypeMap>,
  targetFile: string
) => {
  if (!directus) {
    log(
      'directus instance missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }
  if (!targetFile) {
    log(
      'targetFile missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }

  log('Exporting public permissions', Level.INFO);
  await exportPermissionsByQuery(directus, publicPermissionsQuery, targetFile);
};
