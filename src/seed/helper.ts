import { IDirectus, TypeMap } from '@directus/sdk';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import { Level, log } from '../utils/logger';

export const FILE_PREFIX = 'file:';
export const isFile = (value: any) =>
  typeof value === 'string' && value.startsWith(FILE_PREFIX);

export async function uploadImage(
  directus: IDirectus<TypeMap>,
  imagePath: string
): Promise<string> {
  const form = new FormData();

  form.append('file', fs.createReadStream(imagePath));
  const response = await directus.files.createOne(form, undefined, {
    requestOptions: {
      headers: {
        ...form.getHeaders(),
      },
    },
  });
  return response?.id;
}

export const uploadAndReplaceImages = async (
  directus: IDirectus<TypeMap>,
  items: object[],
  fileRoot = ''
) => {
  const replacedItems: object[] = [];
  for (const item of items) {
    try {
      let itemWithReplacedImage = { ...item };
      for (const entry of Object.entries(item)) {
        const key = entry[0];
        const value = entry[1];
        if (isFile(value) && directus) {
          // Upload image and replace path with id
          itemWithReplacedImage = {
            ...itemWithReplacedImage,
            [key]: await uploadImage(
              directus,
              path.join(
                fileRoot || process.cwd(),
                `/${value.slice(FILE_PREFIX.length)}`
              )
            ),
          };
        }
      }
      replacedItems.push(itemWithReplacedImage);
    } catch (e) {
      log(`Error during image upload: ${e}`, Level.ERROR);
    }
  }
  return replacedItems;
};
