import { Injectable } from '@angular/core';
import { IndexedDBHandler, LocalStorageHandler, ResourceManager } from '../classes';
import { LocalStorageManagerKeys } from '../configs';
import { SupportUtils } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  dbHandler?: IndexedDBHandler;
  dataSyncHandler?: ResourceManager;

  currentUserId = LocalStorageHandler.createBehaviorSubjectHandler<string | undefined>
    (LocalStorageManagerKeys.currentUserId, undefined, SupportUtils.BasicDataTypeSerializer<string>, SupportUtils.BasicDataTypeDeserializer<string>);

  constructor() { }
}
