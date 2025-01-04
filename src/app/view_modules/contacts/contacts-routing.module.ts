import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SyncContactComponent } from './sync-contact/sync-contact.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ContactListComponent,
    data: {
      title: 'Contacts',
      subTitle: 'List',
      moreActions: [
        {
          name: 'Sync From Contact',
          key: 'syncContact',
          icon: { matIcon: 'sync' },
          route: 'contacts/syncContact',
          returnRoute: 'contacts'
        }
      ]
    }
  },
  {
    path: 'syncContact',
    component: SyncContactComponent,
    data: {
      title: 'Sync From Contacts',
      subTitle: 'From Phone Contacts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
