import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material-module/material.modulte';
import { MobileGridComponent } from './mobile-grid/mobile-grid.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DynamicFormPageComponent } from './dynamic-form-page/dynamic-form-page.component';
import { IconComponent } from './icon/icon.component';
import { LeftNavComponent } from './left-nav/left-nav.component';


@NgModule({
  declarations: [
    MobileGridComponent,
    HeaderComponent,
    FooterComponent,
    DynamicFormPageComponent,
    IconComponent,
    LeftNavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    MobileGridComponent,
    HeaderComponent,
    FooterComponent,
    DynamicFormPageComponent,
    IconComponent,
    LeftNavComponent
  ]
})
export class SharedModule { }
