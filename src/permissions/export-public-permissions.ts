import { IDirectus, TypeMap } from '@directus/sdk';
import { writeFileSync } from 'fs';
import { log, Level } from '../utils/logger';
import { getPublicPermissions } from './helper';

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
  try {
    const permissions = await getPublicPermissions(directus);
    if (!permissions) {
      log('No public permissions found', Level.WARN);
      return;
    } else {
      // Remove id column from permission
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const permissionsWithoutId = permissions.map((permission) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...permissionWithoutId } = permission;
        return permissionWithoutId;
      });
      try {
        writeFileSync(
          targetFile,
          JSON.stringify(permissionsWithoutId, null, 2)
        );
        log('Successfully exported public permissions', Level.SUCCESS);
      } catch (error) {
        log(`Error while writing ${targetFile}: ${error}`, Level.ERROR);
      }
    }
  } catch (error) {
    log(`Failed to export public permission: ${error}`, Level.ERROR);
  }
};
