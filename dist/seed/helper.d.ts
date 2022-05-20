import { IDirectus, TypeMap } from '@directus/sdk';
export declare const FILE_PREFIX = "file:";
export declare const isFile: (value: any) => boolean;
export declare function uploadImage(directus: IDirectus<TypeMap>, imagePath: string): Promise<string>;
export declare const uploadAndReplaceImages: (directus: IDirectus<TypeMap>, items: object[], fileRoot?: string) => Promise<object[]>;
