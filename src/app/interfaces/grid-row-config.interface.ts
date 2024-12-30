import { IMoreAction } from ".";

export interface IGridRowConfig {
    icon?: string
    title: string;
    subTitle?: string;
    date?: string;
    status?: string;
    moreActions?: (rowData: any) => IMoreAction[];
    isClickable: (rowData: any) => boolean;
    isExpandable: (rowData: any) => boolean;
}