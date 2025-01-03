import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageHandler } from '../classes';
import { SupportUtils } from '../utils';
import { LocalStorageManagerKeys } from '../configs';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentUserId = LocalStorageHandler.createBehaviorSubjectHandler<string | undefined>
    (LocalStorageManagerKeys.currentUserId, undefined, 'string', SupportUtils.BasicDataTypeSerializer<string>, SupportUtils.BasicDataTypeDeserializer<string>);

  if (currentUserId.value) return true;
  else {
    router.navigateByUrl('login');
    return false;
  }
};
