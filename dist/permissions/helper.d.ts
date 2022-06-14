import { IDirectus, TypeMap } from '@directus/sdk';
export declare const getPublicPermissions: (directus: IDirectus<TypeMap>) => Promise<import("@directus/sdk").PartialItem<import("@directus/sdk").DefaultType>[] | null>;
