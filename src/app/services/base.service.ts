import { Injectable } from '@angular/core';
import { DataSyncHandler, IndexedDBHandler, LocalStorageHandler, ResourceManager } from '../classes';
import { LocalStorageManagerKeys, StoreSchemas } from '../configs';
import { SupportUtils } from '../utils';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { IPage } from '../interfaces';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDBComponent } from '../shared/delete-db/delete-db.component';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  dbHandler?: IndexedDBHandler;
  dataSyncHandler?: DataSyncHandler;
  resourceManager?: ResourceManager;

  currentUserId = LocalStorageHandler.createBehaviorSubjectHandler<string | undefined>
    (LocalStorageManagerKeys.currentUserId, undefined, 'string', SupportUtils.BasicDataTypeSerializer<string>, SupportUtils.BasicDataTypeDeserializer<string>);


  page?: IPage;

  constructor(private router: Router, private dialog: MatDialog) {
    this.currentUserId.subscribe(currentUserId => {
      if (currentUserId) this.initializeDBandSyncHandlers(currentUserId);
      else this.resetDBAndSyncHandler();
    })
  }

  setCurrentUser(currentUserId: string): void {
    this.currentUserId.next(currentUserId);
  }

  resetCurrentUser(): void {
    this.currentUserId.next(undefined);
  }

  logout(): void {
    this.resetCurrentUser();
    this.router.navigateByUrl('login');
  }

  initializeDBandSyncHandlers(currentUserId: string): void {
    this.dataSyncHandler = new DataSyncHandler(currentUserId);
    const indexedDB = new IndexedDBHandler(currentUserId, StoreSchemas)
    indexedDB.init();
    this.dbHandler = indexedDB;
    this.resourceManager = new ResourceManager(this.dbHandler, this.dataSyncHandler);
  }

  resetDBAndSyncHandler(): void {
    delete this.dataSyncHandler;
    delete this.dbHandler;
    delete this.resourceManager;
  }

  resetPageMoreActions(): void {
    this.page = undefined;
  }

  openDeleteDBPopup(): void {
    this.dialog.open(DeleteDBComponent);
  }
}
