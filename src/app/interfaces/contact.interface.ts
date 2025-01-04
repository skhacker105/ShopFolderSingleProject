import { IBaseEntity } from "./";

export interface IContact extends IBaseEntity {
    name: string;
    phone: string;
    email?: string;
    contactId?: string;
}