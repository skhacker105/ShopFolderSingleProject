import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { FormControlConfig, IIcon } from '../../interfaces';

@Component({
  selector: 'app-dynamic-form-page',
  templateUrl: './dynamic-form-page.component.html',
  styleUrl: './dynamic-form-page.component.scss'
})
export class DynamicFormPageComponent {
  @Input() formConfig: FormControlConfig[] = [];
  @Input() alignment:  'page-center' | 'one-line-center' | 'stacked' | 'left-right' | 'two-per-row' = 'stacked';
  @Input() showCancelButton = true;
  @Input() cancelButtonText = '';
  @Input() saveButtonText = '';
  @Output() formGroupChange = new EventEmitter<FormGroup>();
  @Output() saveClicked = new EventEmitter<void>();
  @Output() cancelClicked = new EventEmitter();

  formGroup: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formConfig.forEach((control) => {
      const validators: ValidatorFn[] = [];
      if (control.required) {
        validators.push(Validators.required);
      }
      if (control.validations) {
        Object.values(control.validations).forEach((validation) => validators.push(validation));
      }
      const formControl = new FormControl(control.defaultValue || '', validators);
      this.formGroup.addControl(control.name, formControl);
    });

    this.formGroupChange.emit(this.formGroup);
  }

  computeClasses(): string[] {
    return this.alignment.split(' ').map(alignment => alignment.trim());
  }

  getControlOptionIcon(control: FormControlConfig): IIcon | undefined {
    const selectedOptionValue = this.formGroup.get(control.name)?.value;
    const selectedOption = selectedOptionValue ? control.options?.find(option => option.value === selectedOptionValue) : undefined;
    return selectedOption?.icon;
  }
}
