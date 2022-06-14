import { IDirectus, TypeMap } from '@directus/sdk';
import { writeFileSync } from 'fs';
import { log, Level } from '../utils/logger';
import { getDefaultPresetForCollection } from './helper';

export const exportDefaultPreset = async (
  directus: IDirectus<TypeMap>,
  collection: string,
  targetFile: string
) => {
  if (!directus) {
    log(
      'directus instance missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }
  if (!collection) {
    log(
      'collection missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }
  if (!targetFile) {
    log(
      'targetFile missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }

  log(`Exporting default preset for collection ${collection}`, Level.INFO);
  try {
    const preset = await getDefaultPresetForCollection(directus, collection);
    if (!preset) {
      log(`Default preset not found for ${collection}`, Level.WARN);
      return;
    } else {
      // Remove id column from presets
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...presetWithoutId } = preset;
      try {
        writeFileSync(targetFile, JSON.stringify(presetWithoutId, null, 2));
        log(
          `Successfully exported default preset to ${targetFile}`,
          Level.SUCCESS
        );
      } catch (error) {
        log(`Error while writing ${targetFile}: ${error}`, Level.ERROR);
      }
    }
  } catch (error) {
    log(`Failed to export default preset: ${error}`, Level.ERROR);
  }
};
