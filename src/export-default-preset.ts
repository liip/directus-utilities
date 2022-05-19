import { IDirectus, TypeMap } from '@directus/sdk';
import { writeFileSync } from 'fs';
import { log, Level } from './logger';
import { getDefaultPresetForCollection } from './helper';

export const exportDefaultPreset = async (
  directus: IDirectus<TypeMap>,
  collection: string,
  target?: string
) => {
  log(`Exporting default preset for collection ${collection}`, Level.INFO);
  try {
    const preset = await getDefaultPresetForCollection(directus, collection);
    if (!preset) {
      log(`Default preset not found for ${collection}`, Level.WARN);
      return;
    } else {
      const targetFile = `${
        target ? `${target}/` : ''
      }preset-${collection}.json`;
      // Remove id column from presets
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...presetWithoutId } = preset;
      try {
        writeFileSync(targetFile, JSON.stringify(presetWithoutId, null, 2));
        log(
          `Sucessfully exported default preset to ${targetFile}`,
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
