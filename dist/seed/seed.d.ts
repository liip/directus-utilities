import { IDirectus, TypeMap } from '@directus/sdk';
interface SeedOptions {
    clearTableEntries?: boolean;
    fileRoot?: string;
}
interface SeedSingletonOptions {
    fileRoot?: string;
}
export declare const seedSingletonWithImages: <T extends string>(directus: IDirectus<TypeMap>, collection: T, data: object, options: SeedSingletonOptions) => Promise<void>;
export declare const seedWithImages: <T extends string>(directus: IDirectus<TypeMap>, collection: T, items: object[], options: SeedOptions) => Promise<void>;
export {};
