import {MatPaginator, MatSort} from '@angular/material'
import {DataSource} from '@angular/cdk/collections'
import {Observable} from 'rxjs/Observable'
import {PlantDatabaseService, PlantData} from './plant-database.service'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/map'

export class PersonDataSource extends DataSource<any> {
  constructor(private _plantDatabase: PlantDatabaseService,
              private _paginator: MatPaginator,
              private _sort: MatSort) {
    super()
  }

  connect(): Observable<PlantData[]> {
    const displayDataChanges = [
      this._paginator.page,
      this._sort.sortChange,
      this._plantDatabase.dataChange
    ]
    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.getSortedData()

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize
      return data.splice(startIndex, this._paginator.pageSize)
    })
  }

  disconnect() {
    // No-op
  }

  /** Returns a sorted copy of the database data. */
  getSortedData(): PlantData[] {
    const data = this._plantDatabase.data.slice()
    if (!this._sort.active || this._sort.direction === '') { return data }

    return data.sort((a, b) => {
      let propertyA: number|string = ''
      let propertyB: number|string = ''

      switch (this._sort.active) {
        case 'location': [propertyA, propertyB] = [a.location, b.location]; break
        case 'region': [propertyA, propertyB] = [a.region, b.region]; break
        case 'yieldData': [propertyA, propertyB] = [a.yieldData, b.yieldData]; break
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
    })
  }
}
