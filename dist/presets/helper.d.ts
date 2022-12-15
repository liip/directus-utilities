import { IDirectus, TypeMap } from '@directus/sdk';
export declare const getDefaultPresetForCollection: (directus: IDirectus<TypeMap>, collection: string) => Promise<import("@directus/sdk").DefaultItem<import("@directus/sdk").PresetItem<unknown>> | null>;
