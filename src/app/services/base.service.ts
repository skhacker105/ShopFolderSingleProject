import { Injectable } from '@angular/core';
import { DataSyncHandler, IndexedDBHandler, LocalStorageHandler } from '../classes';
import { LocalStorageManagerKeys, StoreSchemas } from '../configs';
import { SupportUtils } from '../utils';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  dbHandler = new BehaviorSubject<IndexedDBHandler | undefined>(undefined);
  dataSyncHandler?: DataSyncHandler;

  currentUserId = LocalStorageHandler.createBehaviorSubjectHandler<string | undefined>
    (LocalStorageManagerKeys.currentUserId, undefined, 'string', SupportUtils.BasicDataTypeSerializer<string>, SupportUtils.BasicDataTypeDeserializer<string>);


  pageTitle = '';
  pageSubTitle = '';

  constructor(private router: Router) {
    this.currentUserId.subscribe(currentUserId => {
      if (currentUserId)
      this.initializeDBandSyncHandlers(currentUserId)
    })
  }

  setCurrentUser(currentUserId: string): void {
    this.currentUserId.next(currentUserId);
  }

  resetCurrentUser(): void {
    this.currentUserId.next('');
  }

  logout(): void {
    this.resetCurrentUser();
    this.router.navigateByUrl('login');
  }

  initializeDBandSyncHandlers(currentUserId: string): void {
    this.dataSyncHandler = new DataSyncHandler(currentUserId);
    this.dbHandler.next(new IndexedDBHandler(currentUserId, StoreSchemas));
  }
}
