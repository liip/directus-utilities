import { uploadAndReplaceImages } from './helper';
import { IDirectus, TypeMap } from '@directus/sdk';
import { Level, log } from '../utils/logger';

interface SeedOptions {
  clearTableEntries?: boolean;
  fileRoot?: string;
}

interface SeedSingletonOptions {
  fileRoot?: string;
}

export const seedSingletonWithImages = async <T extends string>(
  directus: IDirectus<TypeMap>,
  collection: T,
  data: object,
  options: SeedSingletonOptions
) => {
  const [dataWithImages] = await uploadAndReplaceImages(
    directus,
    [data],
    options.fileRoot
  );
  log(`Updating singleton ${collection}.`, Level.INFO);
  await directus.singleton(collection).update(dataWithImages);
  log(`Successfully updated singleton ${collection}.`, Level.SUCCESS);
};

export const seedWithImages = async <T extends string>(
  directus: IDirectus<TypeMap>,
  collection: T,
  items: object[],
  options: SeedOptions
) => {
  if (options.clearTableEntries) {
    const existingItems = await directus
      .items<T>(collection)
      .readByQuery({ limit: -1 });
    if (existingItems?.data && existingItems.data.length !== 0) {
      log(
        `Removing ${existingItems.data.length} existing items from ${collection}.`,
        Level.INFO
      );
      await directus
        .items<T>(collection)
        .deleteMany(existingItems.data.map((item: any) => item.id));
    }
  }

  const itemsWithImages = await uploadAndReplaceImages(
    directus,
    items,
    options.fileRoot
  );
  log(
    `Creating items for ${collection} (count: ${itemsWithImages.length}).`,
    Level.INFO
  );
  await directus.items(collection).createMany(itemsWithImages);
  log(
    `Successfully created ${itemsWithImages.length} items for ${collection}.`,
    Level.SUCCESS
  );
};
