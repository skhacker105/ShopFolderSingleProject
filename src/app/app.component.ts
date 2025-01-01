import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ShopFolderSingleProject';

  constructor(
    public baseService: BaseService
  ) {}

}
