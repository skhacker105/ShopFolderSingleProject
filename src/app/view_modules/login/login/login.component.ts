import { Component } from '@angular/core';
import { BaseComponent } from '../../../shared/BaseComponent';
import { FormControlConfig } from '../../../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
  loginForm: FormControlConfig[] = [
    {
      name: 'extension',
      type: 'select',
      label: ''
    },
    {
      name: 'contact',
      type: 'text',
      label: 'Contact',
      placeHolder: 'Enter your phone number'
    }
  ];
}
