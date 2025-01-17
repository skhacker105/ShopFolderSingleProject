import { IIcon } from "./";

export interface IMoreAction {
    name: string;
    key: string;
    icon?: IIcon;
    route: string;
    returnRoute: string;
}