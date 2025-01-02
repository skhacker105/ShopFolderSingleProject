import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard } from './route-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./view_modules/login/login-routing.module').then(module => module.LoginRoutingModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./view_modules/contacts/contacts.module').then(module => module.ContactsModule),
    canActivate: [authenticationGuard]
  },
  {
    path: 'error',
    loadChildren: () => import('./view_modules/error-route/error-route.module').then(module => module.ErrorRouteModule)
  },
  {
    path: '*',
    redirectTo: 'error',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
