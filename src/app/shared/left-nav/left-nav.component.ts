import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.scss'
})
export class LeftNavComponent {
  @Output() closeSideNav = new EventEmitter<void>();
  @Output() logoutClicked = new EventEmitter<void>();
}
