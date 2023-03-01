import { IDirectus, TypeMap } from '@directus/sdk';
import { writeFileSync } from 'fs';
import { log, Level } from '../utils/logger';
import {
  getDefaultPresetForCollection,
  getPresetForCollection,
} from './helper';

export const exportPreset = async (
  directus: IDirectus<TypeMap>,
  collection: string,
  preset: string,
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
  if (!preset) {
    log(
      'preset missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }
  if (!targetFile) {
    log(
      'targetFile missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }

  log(`Exporting preset ${preset} for collection ${collection}`, Level.INFO);
  try {
    const presetData = await getPresetForCollection(
      directus,
      collection,
      preset
    );

    if (!presetData) {
      log(`Preset ${preset} not found for ${collection}`, Level.WARN);
      return;
    } else {
      // Remove id column from presets
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...presetWithoutId } = presetData;
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
