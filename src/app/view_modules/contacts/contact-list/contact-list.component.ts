import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../shared';
import { BaseService } from '../../../services';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent extends BaseComponent implements OnInit {

  constructor(
    route: ActivatedRoute,
    baseService: BaseService
  ) {
    super(route, baseService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
