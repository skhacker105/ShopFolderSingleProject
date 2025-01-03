import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
  ],
  imports: [
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatRippleModule,
    MatSidenavModule
  ],
  exports: [
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatRippleModule,
    MatSidenavModule
  ]
})
export class MaterialModule { }
