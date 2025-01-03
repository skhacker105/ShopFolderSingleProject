import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title = 'Page';
  @Input() subTitle = 'some text';
  @Input() showMenuTrigger = true;
  @Output() menuTriggerClicked = new EventEmitter<void>();
}
