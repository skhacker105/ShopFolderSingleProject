import { Component, Input, input } from '@angular/core';
import { IGridRowConfig } from '../../interfaces';
import { ResourceDataTypes } from '../../types';

@Component({
  selector: 'app-mobile-grid',
  templateUrl: './mobile-grid.component.html',
  styleUrl: './mobile-grid.component.scss'
})
export class MobileGridComponent {

  @Input() rowConfig?: IGridRowConfig;
  @Input() resourceData: ResourceDataTypes[] = [];
  
  @Input() selectionMode = false;
  @Input() isRowMoreAction = true;
  @Input() isRowClickable = true;
  @Input() isRowExpandable = true;
}
