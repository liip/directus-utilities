import { IDirectus, TypeMap } from '@directus/sdk';
export declare const exportPreset: (directus: IDirectus<TypeMap>, collection: string, preset: string, targetFile: string) => Promise<void>;
