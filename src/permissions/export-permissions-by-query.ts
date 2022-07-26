import { IDirectus, TypeMap } from '@directus/sdk';
import { writeFileSync } from 'fs';
import { log, Level } from '../utils/logger';

export const exportPermissionsByQuery = async (
  directus: IDirectus<TypeMap>,
  query: any,
  targetFile: string
) => {
  if (!directus) {
    log(
      'directus instance missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }
  if (!query) {
    log(
      'query missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }
  if (!targetFile) {
    log(
      'targetFile missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }

  log('Exporting permissions', Level.INFO);
  try {
    const permissionsResponse = await directus.permissions.readByQuery(query);
    const permissions =
      permissionsResponse.data && permissionsResponse.data?.length > 0
        ? permissionsResponse.data
        : null;
    if (!permissions) {
      log('No permissions found', Level.WARN);
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
        log('Successfully exported permissions', Level.SUCCESS);
      } catch (error) {
        log(`Error while writing ${targetFile}: ${error}`, Level.ERROR);
      }
    }
  } catch (error) {
    log(`Failed to export permission: ${error}`, Level.ERROR);
  }
};
