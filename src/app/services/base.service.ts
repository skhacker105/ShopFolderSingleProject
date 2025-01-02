import { Injectable } from '@angular/core';
import { DataSyncHandler, IndexedDBHandler, LocalStorageHandler } from '../classes';
import { LocalStorageManagerKeys, StoreSchemas } from '../configs';
import { SupportUtils } from '../utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  dbHandler = new BehaviorSubject<IndexedDBHandler | undefined>(undefined);
  dataSyncHandler?: DataSyncHandler;

  currentUserId = LocalStorageHandler.createBehaviorSubjectHandler<string | undefined>
    (LocalStorageManagerKeys.currentUserId, undefined, SupportUtils.BasicDataTypeSerializer<string>, SupportUtils.BasicDataTypeDeserializer<string>);


  pageTitle = '';
  pageSubTitle = '';
  isSideMenuOpen = new BehaviorSubject<boolean>(false);

  constructor() {
    this.currentUserId.subscribe(currentUserId => {
      if (currentUserId)
      this.initialize(currentUserId)
    })
  }

  toggleSideMenu(val?: boolean): void {
    this.isSideMenuOpen.next(val !== undefined ? val : !this.isSideMenuOpen.value);
  }

  initialize(currentUserId: string): void {
    this.dataSyncHandler = new DataSyncHandler(currentUserId);
    this.dbHandler.next(new IndexedDBHandler(currentUserId, StoreSchemas));
  }
}
