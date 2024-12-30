import { ResourceDataTypes, SyncTransactionType } from "../types";
import { IBaseEntity } from "./";

export interface ISyncTransactionData extends IBaseEntity {
    type: SyncTransactionType,
    data: ResourceDataTypes;
}