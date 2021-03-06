import { IDirectus, TypeMap } from '@directus/sdk';

export const getDefaultPresetForCollection = async (
  directus: IDirectus<TypeMap>,
  collection: string
) => {
  const presets = await directus.presets.readByQuery({
    filter: {
      collection: {
        _eq: collection,
      },
      user: {
        _null: true,
      },
      bookmark: {
        _null: true,
      },
    },
    limit: 1,
  });
  return presets.data && presets.data?.length > 0 ? presets.data[0] : null;
};
