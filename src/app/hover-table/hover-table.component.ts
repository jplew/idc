import {Component} from '@angular/core'
import {DataSource} from '@angular/cdk/collections'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/of'

/**
 * @title Basic table
 */
@Component({
  selector: 'table-basic-example',
  templateUrl: './hover-table.component.html'
})
export class HoverTableComponent {
  displayedColumns = ['position', 'name', 'weight']
  dataSource = new ExampleDataSource()
}

export interface Element {
  name: string
  position: number
  weight: number
}

const data: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079},
  {position: 2, name: 'Helium', weight: 4.0026},
  {position: 3, name: 'Lithium', weight: 6.941},
  {position: 4, name: 'Beryllium', weight: 9.0122},
]

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(data)
  }

  disconnect() {}
}
