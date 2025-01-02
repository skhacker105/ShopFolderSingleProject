import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard, unAuthenticatedGuard } from './route-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./view_modules/').then(module => module.LoginModule),
    canActivate: [unAuthenticatedGuard]
  },
  {
    path: 'contacts',
    loadChildren: () => import('./view_modules/').then(module => module.ContactsModule),
    canActivate: [authenticationGuard]
  },
  {
    path: 'error',
    loadChildren: () => import('./view_modules/').then(module => module.ErrorRouteModule)
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
