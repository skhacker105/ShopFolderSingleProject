import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRouteRoutingModule } from './error-route-routing.module';
import { UnAuthorisedComponent } from './un-authorised/un-authorised.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    UnAuthorisedComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    ErrorRouteRoutingModule
  ]
})
export class ErrorRouteModule { }
