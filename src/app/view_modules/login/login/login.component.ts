import { Component } from '@angular/core';
import { BaseComponent } from '../../../shared/BaseComponent';
import { FormControlConfig } from '../../../interfaces';
import { CountryList } from '../../../configs';
import { SupportUtils } from '../../../utils';

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
      label: '',
      options: CountryList.map(country => ({ label: country.name + ' (' + country.phone_extension + ') ', value: country.short_name, icon: { iconURL: country.flag_url } })),
      defaultValue: SupportUtils.getMyCountryCode() ?? 'IN'
    },
    {
      name: 'contact',
      type: 'text',
      label: 'Contact',
      placeHolder: 'Enter your phone number',
      textboxType: 'number',
      maxLength: 10
    }
  ];
}
