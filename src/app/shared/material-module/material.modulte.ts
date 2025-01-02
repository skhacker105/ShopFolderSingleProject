import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [
  ],
  imports: [
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatRippleModule
  ],
  exports: [
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatRippleModule
  ]
})
export class MaterialModule { }
