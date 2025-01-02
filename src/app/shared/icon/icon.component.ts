import { Component, Input } from '@angular/core';
import { IIcon } from '../../interfaces';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() icon?: IIcon
}
