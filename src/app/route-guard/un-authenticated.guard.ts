import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageHandler } from '../classes';
import { LocalStorageManagerKeys } from '../configs';
import { SupportUtils } from '../utils';

export const unAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentUserId = LocalStorageHandler.createBehaviorSubjectHandler<string | undefined>
    (LocalStorageManagerKeys.currentUserId, undefined, 'string', SupportUtils.BasicDataTypeSerializer<string>, SupportUtils.BasicDataTypeDeserializer<string>);

  if (!currentUserId.value) return true;
  else {
    router.navigateByUrl('contacts');
    return false;
  }
};
