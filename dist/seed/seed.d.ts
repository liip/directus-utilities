import { IDirectus, TypeMap } from '@directus/sdk';
interface SeedOptions {
    clearTableEntries: boolean;
    fileRoot: string;
}
export declare const seedWithImages: <T extends string>(directus: IDirectus<TypeMap>, collection: T, items: object[], options: SeedOptions) => Promise<void>;
export {};
