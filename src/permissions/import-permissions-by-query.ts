import { IDirectus, TypeMap } from '@directus/sdk';
import { readFileSync } from 'fs';
import { log, Level } from '../utils/logger';

export const importPermissionsByQuery = async (
  directus: IDirectus<TypeMap>,
  query: any,
  sourceFile: string,
  roleId: string | null
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
  if (!sourceFile) {
    log(
      'sourceFile missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }

  log(`Importing permissions from ${sourceFile}`, Level.INFO);
  try {
    const permissionsBuffer = readFileSync(sourceFile);
    const permissionsToImport = JSON.parse(permissionsBuffer.toString());
    try {
      const existingPermissionsResponse =
        await directus.permissions.readByQuery(query);
      const existingPermissions =
        existingPermissionsResponse.data &&
        existingPermissionsResponse.data.length > 0
          ? existingPermissionsResponse?.data
          : [];
      const updatedPermissions: any[] = [];
      for (const permissionToImport of permissionsToImport) {
        const permissionToImportWithRole = {
          ...permissionToImport,
          role: roleId,
        };
        const existingPermission = existingPermissions?.find(
          (permission) =>
            permission.collection === permissionToImport.collection &&
            permission.action === permissionToImport.action
        );
        if (existingPermission) {
          // updating existing permission
          log(
            `Updating existing permission for ${permissionToImport.collection} (action: ${permissionToImport.action})`,
            Level.INFO
          );
          await directus.permissions.updateOne(
            existingPermission.id,
            permissionToImportWithRole
          );
          updatedPermissions.push(existingPermission);
          log(
            `Successfully updated existing permission (id: ${existingPermission.id}) for ${permissionToImport.collection} (action: ${permissionToImport.action})`,
            Level.SUCCESS
          );
        } else {
          log(
            `Creating new permission for ${permissionToImport.collection} (action: ${permissionToImport.action})`,
            Level.INFO
          );
          const newPermission = await directus.permissions.createOne(
            permissionToImportWithRole
          );
          log(
            `Successfully created permission (id: ${newPermission?.id}) for ${permissionToImport.collection} (action: ${permissionToImport.action})`,
            Level.SUCCESS
          );
        }
      }

      // Delete permissions which don't exist anymore
      const permissionsToRemove = existingPermissions?.filter(
        (existingPermission) =>
          !updatedPermissions.some(
            (updatedPermission) =>
              existingPermission.id === updatedPermission.id
          )
      );
      if (permissionsToRemove && permissionsToRemove.length > 0) {
        const permissionsToRemoveIds = permissionsToRemove.map(
          (permissionToRemove) => permissionToRemove.id
        );
        log(
          `Removing outdated permissions [${permissionsToRemove
            .map(
              (permissionToRemove) =>
                `${permissionToRemove.collection} (action: ${permissionToRemove.action}) (id: ${permissionToRemove.id})`
            )
            .join(', ')}]`,
          Level.INFO
        );
        await directus.permissions.deleteMany(permissionsToRemoveIds);
        log('Successfully removed outdated permissions', Level.SUCCESS);
      }
    } catch (error) {
      log(`Failed to import permissions: ${error}`, Level.ERROR);
    }
  } catch (error) {
    log(`Error while reading ${sourceFile}: ${error}`, Level.ERROR);
  }
};
