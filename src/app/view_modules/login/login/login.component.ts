import { Component } from '@angular/core';
import { BaseComponent } from '../../../shared/BaseComponent';
import { FormControlConfig } from '../../../interfaces';
import { CountryList } from '../../../configs';
import { SupportUtils } from '../../../utils';
import { FormGroup } from '@angular/forms';
import { BaseService } from '../../../services';
import { ActivatedRoute, Router } from '@angular/router';

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
      label: '',
      placeHolder: 'Enter your phone number',
      textboxType: 'number',
      maxLength: 10,
      required: true
    }
  ];

  loginFormGroup: FormGroup | undefined;

  constructor(route: ActivatedRoute, baseService: BaseService, private router: Router) {
    super(route, baseService);
  }

  login() {
    if (this.loginFormGroup?.invalid) return;
    const val: any = this.loginFormGroup?.value;
    console.log(val);
    this.baseService.setCurrentUser(val.extension + val.contact);
    this.router.navigateByUrl('contacts')
  }
}
