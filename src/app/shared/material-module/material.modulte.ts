import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
  ],
  imports: [
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatRippleModule,
    MatSidenavModule,
    MatMenuModule
  ],
  exports: [
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatRippleModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
