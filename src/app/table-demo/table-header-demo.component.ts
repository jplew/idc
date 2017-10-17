import {Component, EventEmitter, Output} from '@angular/core'

@Component({
  moduleId: module.id,
  selector: 'app-table-header-demo',
  templateUrl: 'table-header-demo.component.html',
  styleUrls: ['table-header-demo.component.css'],
})
export class TableHeaderDemoComponent {
  @Output() shiftColumns = new EventEmitter<void>()
  @Output() toggleColorColumn = new EventEmitter<void>()
}
