import { IMoreAction } from "./";

export interface IPage {
    title: string;
    subTitle?: string;
    moreActions?: IMoreAction[];
}
