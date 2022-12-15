import { IDirectus, TypeMap } from '@directus/sdk';
export declare const exportPermissionsByQuery: (directus: IDirectus<TypeMap>, query: any, targetFile: string, propertiesToRemove?: string[]) => Promise<void>;
