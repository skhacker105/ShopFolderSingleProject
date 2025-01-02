import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnAuthorisedComponent } from './un-authorised/un-authorised.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pageNotFound',
    pathMatch: 'full'
  },
  {
    path: 'pageNotFound',
    component: PageNotFoundComponent
  },
  {
    path: 'unAuthorised',
    component: UnAuthorisedComponent
  },
  {
    path: '*',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRouteRoutingModule { }
