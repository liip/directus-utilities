import { IDirectus, TypeMap } from '@directus/sdk';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { log, Level } from '../utils/logger';
import { getDefaultPresetForCollection, getPresetForCollection } from './helper';

export const importPresets = async (
  directus: IDirectus<TypeMap>,
  sourceDir: string
) => {
  if (!directus) {
    log(
      'directus instance missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }
  if (!sourceDir) {
    log(
      'source directory missing. Please provide it when calling the function.',
      Level.ERROR
    );
  }

  log(
    `Importing presets from ${sourceDir}`,
    Level.INFO
  );

  try {
    const fileNames = readdirSync(sourceDir);
    for (const fileName of fileNames) {
      try {
        const sourceFile = join(sourceDir, fileName);
        const presetBuffer = readFileSync(sourceFile);
        const preset = JSON.parse(presetBuffer.toString());
        try {
          const existingPreset = await getPresetForCollection(
                directus,
                preset.collection,
                preset.bookmark
              );

          if (existingPreset) {
            // updating existing preset
            log(`Updating existing preset ${preset.bookmark ?? 'default'} for ${preset.collection}`, Level.INFO);
            await directus.presets.updateOne(existingPreset.id, preset);
            log(
              `Successfully updated existing preset ${preset.bookmark ?? 'default'} (id: ${existingPreset.id}) for ${preset.collection}`,
              Level.SUCCESS
            );
          } else {
            log(`Creating new preset ${preset.bookmark ?? 'default'} for ${preset.collection}`, Level.INFO);
            const newPreset = await directus.presets.createOne(preset);
            log(
              `Successfully created preset ${preset.bookmark ?? 'default'} (id: ${newPreset?.id}) for ${preset.collection}`,
              Level.SUCCESS
            );
          }
        } catch (error) {
          log(`Failed to import preset ${fileName}: ${error}`, Level.ERROR);
        }
      } catch (error) {
        log(`Error while reading ${fileName}: ${error}`, Level.ERROR);
      }
    };
  } catch (error) {
    log(`Error while reading ${sourceDir}: ${error}`, Level.ERROR);
  }
};
