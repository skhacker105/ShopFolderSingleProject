import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BaseService } from './services';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'ShopFolderSingleProject';
  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  constructor(
    public baseService: BaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.baseService.resetPageMoreActions(); // Clear menu items on every route change
      }
    });
  }

  logout(): void {
    this.drawer.close();
    this.baseService.logout();
  }

  triggerDeleteDatabase(): void {
    this.baseService.openDeleteDBPopup();
  }
}
