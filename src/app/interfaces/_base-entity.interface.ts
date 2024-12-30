export interface IBaseEntity {
    id: string;
    createdOn: Date,
    createdBy: string;
    lastModifiedOn?: Date;
    lastModifiedBy?: string;
}