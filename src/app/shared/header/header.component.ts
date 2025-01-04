import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMoreAction } from '../../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title?: string = 'Page';
  @Input() subTitle?: string = 'some text';
  @Input() showMenuTrigger = true;
  @Input() moreActions?: IMoreAction[];
  @Output() menuTriggerClicked = new EventEmitter<void>();
  @Output() deleteDBClicked = new EventEmitter<void>();
}
