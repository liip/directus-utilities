import { IDirectus, TypeMap } from '@directus/sdk';
import { readFileSync } from 'fs';
import { log, Level } from '../utils/logger';
import { getDefaultPresetForCollection } from './helper';

export const importDefaultPreset = async (
  directus: IDirectus<TypeMap>,
  collection: string,
  sourceFile: string
) => {
  log(
    `Importing default preset for ${collection} from ${sourceFile}`,
    Level.INFO
  );
  try {
    const presetBuffer = readFileSync(sourceFile);
    const preset = JSON.parse(presetBuffer.toString());
    try {
      const existingPreset = await getDefaultPresetForCollection(
        directus,
        collection
      );
      if (existingPreset) {
        // updating existing preset
        log(`Updating existing preset for ${collection}`, Level.INFO);
        await directus.presets.updateOne(existingPreset.id, preset);
        log(
          `Sucessfully updated existing default preset (id: ${existingPreset.id}) for ${collection}`,
          Level.SUCCESS
        );
      } else {
        log(`Creating new preset for ${collection}`, Level.INFO);
        const newPreset = await directus.presets.createOne(preset);
        log(
          `Sucessfully created default preset (id: ${newPreset?.id}) for ${collection}`,
          Level.SUCCESS
        );
      }
    } catch (error) {
      log(`Failed to import preset: ${error}`, Level.ERROR);
    }
  } catch (error) {
    log(`Error while reading ${sourceFile}: ${error}`, Level.ERROR);
  }
};
