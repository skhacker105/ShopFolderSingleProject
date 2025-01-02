import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { BaseService } from '../services';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const baseService = inject(BaseService);
  const router = inject(Router);
  if (baseService.currentUserId.value) return true;
  else {
    router.navigateByUrl('login');
    return false;
  }
};
