import { IDirectus, TypeMap } from '@directus/sdk';
export declare const exportPermissionsByRolename: (directus: IDirectus<TypeMap>, rolename: string, targetFile: string) => Promise<void>;
