import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from './services';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'ShopFolderSingleProject';
  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  constructor(
    public baseService: BaseService
  ) {
    this.baseService.isLeftNavOpen.subscribe(isOpen => {
      this.drawer.close();
    });
  }

  logout(): void {
    this.baseService.logout();
  }
}
