import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../shared/BaseComponent';
import { BaseService, ContactService } from '../../../services';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent extends BaseComponent implements OnInit {


  constructor(
    route: ActivatedRoute,
    baseService: BaseService,
    private contactService: ContactService
  ) {
    super(route, baseService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
