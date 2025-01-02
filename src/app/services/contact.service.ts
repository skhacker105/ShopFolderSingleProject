import { Injectable } from '@angular/core';
import { ResourceManager } from '../classes';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private baseService: BaseService) {
    this.baseService.dbHandler.subscribe(dbHandler => {
      this.createContactStoreManager();
    });
  }

  createContactStoreManager(): void {
    if (!this.baseService.dbHandler.value || !this.baseService.dataSyncHandler) return;
    
    new ResourceManager(this.baseService.dbHandler.value, this.baseService.dataSyncHandler);
  }
}
