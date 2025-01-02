import { ValidatorFn } from "@angular/forms";
import { IIcon } from "./icon.interface";

export interface FormControlConfig {
    name: string;
    type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
    label: string;
    placeHolder?: string;
    defaultValue?: any;
    required?: boolean;
    options?: FormControlOptionConfig[];
    validations?: { [key: string]: ValidatorFn };
    textboxType?: 'phone' | 'number' | 'email' | 'text',
    maxLength?: number
  }

  export interface FormControlOptionConfig {
    label: string;
    value: any;
    icon?: IIcon
  }