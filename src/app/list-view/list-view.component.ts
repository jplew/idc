import {Component, ElementRef, ViewChild, OnInit, Input, AfterContentInit, ChangeDetectorRef} from '@angular/core'
import {DataSource} from '@angular/cdk/collections'
import {MatPaginator} from '@angular/material'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/observable/fromEvent'
import { DataService } from '../services/data.service'

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
})
export class ListViewComponent implements OnInit, AfterContentInit {
  displayedColumns = ['id', 'location', 'region', ]
  _plantData: any
  dataSource: ExampleDataSource | null
  @ViewChild(MatPaginator) paginator: MatPaginator
  @Input() isHiddenBool: boolean

  constructor(private changeDetector: ChangeDetectorRef, private dataService: DataService) {

    dataService.loadData$.subscribe(
      res => {
        this._plantData = res
        console.log(res)
      })

  }

  ngAfterContentInit() {

  }
  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.paginator, this.dataService)
    this.changeDetector.detectChanges()
    setTimeout(() => this.changeDetector.markForCheck())
  }

}

export class ExampleDataSource extends DataSource<any> {

  dataSubscription: any

  constructor(private _paginator: MatPaginator, private dataService: DataService ) {
    super()

    dataService.loadData$.subscribe(
      res => {
        this.dataSubscription = res
      })
      console.log(this.dataSubscription)

  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {

    console.log('connect() called')

    const displayDataChanges = [
      this.dataSubscription,
      this._paginator.page,
    ]

      /** Connect function called by the table to retrieve one stream containing the data to render. */

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.dataSubscription.slice()

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize

      console.log(startIndex)
      console.log(this._paginator.pageSize)

      return data.splice(startIndex, this._paginator.pageSize)
    })
  }

  // connect(): Observable<Element[]> {
  //   return Observable.of(this.dataSubscription)
  // }

  disconnect() {}
}
