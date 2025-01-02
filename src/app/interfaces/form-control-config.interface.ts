import { ValidatorFn } from "@angular/forms";

export interface FormControlConfig {
    name: string;
    type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
    label: string;
    placeHolder?: string;
    defaultValue?: any;
    required?: boolean;
    options?: { label: string; value: any }[];
    validations?: { [key: string]: ValidatorFn };
  }