import { IBaseEntity, ISyncTransactionData } from "./";

export interface IAccessControl extends IBaseEntity {
    module: string;
    userId?: string;
    roleId?: string;
    dataPermissions: {
        read?: 'all' | string[];
        write?: 'all' | string[];
        update?: 'all' | string[];
        delete?: 'all' | string[];
    },
    featurePermissions: {
        [key: string]: boolean;
    },
    hasDataAccess(data: ISyncTransactionData): boolean;
    hasFeatrureAccess(data: ISyncTransactionData): boolean;
}
