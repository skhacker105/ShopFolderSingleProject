import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SyncContactComponent } from './sync-contact/sync-contact.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ContactListComponent,
    SyncContactComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule
  ]
})
export class ContactsModule { }
