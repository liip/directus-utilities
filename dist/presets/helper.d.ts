import { IDirectus, TypeMap } from '@directus/sdk';
export declare const getDefaultPresetForCollection: (directus: IDirectus<TypeMap>, collection: string) => Promise<import("@directus/sdk").DefaultItem<import("@directus/sdk").PresetItem<unknown>> | null>;
export declare const getPresetForCollection: (directus: IDirectus<TypeMap>, collection: string, preset: string) => Promise<import("@directus/sdk").DefaultItem<import("@directus/sdk").PresetItem<unknown>> | null>;
