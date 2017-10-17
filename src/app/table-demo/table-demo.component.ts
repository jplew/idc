import {Component, ViewChild, AfterViewInit, OnInit, Input} from '@angular/core'
import {PlantDatabase, PlantData} from '../services/plant-database'
import {PersonDataSource} from '../services/person-data-source'
import {MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import {DetailRow, PersonDetailDataSource} from '../services/person-detail-data-source'
import {animate, state, style, transition, trigger} from '@angular/animations'
import {FormControl} from '@angular/forms'

export type UserProperties = 'location' | 'region' | 'yieldData' | undefined

export type TrackByStrategy = 'id' | 'reference' | 'index'

const properties = ['location', 'region', 'yieldData']

@Component({
  moduleId: module.id,
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableDemoComponent implements OnInit, AfterViewInit {
  dataSource: PersonDataSource | null
  dataSourceWithDetails: PersonDetailDataSource | null
  matTableDataSource = new MatTableDataSource<PlantData>()
  displayedColumns: UserProperties[] = []
  trackByStrategy: TrackByStrategy = 'reference'
  changeReferences = false
  highlights = new Set<string>()
  wasExpanded = new Set<PlantData>()

  filter = new FormControl()

  dynamicColumnDefs: any[] = []
  dynamicColumnIds: string[] = []

  expandedPerson: PlantData

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('paginatorForDataSource') paginatorForDataSource: MatPaginator
  @ViewChild('sortForDataSource') sortForDataSource: MatSort

  @Input() isHiddenBool: boolean

  isDetailRow = (row: DetailRow|PlantData) => row.hasOwnProperty('detailRow')

  constructor(public _plantDatabase: PlantDatabase) {
    this.matTableDataSource.sortingDataAccessor = (data: PlantData, property: string) => {
      switch (property) {
        case 'location': return data.location
        case 'region': return data.region
        case 'yieldData': return data.yieldData
        default: return ''
      }
    }
    this.matTableDataSource.filterTermAccessor = (data: PlantData) => data.location
    this.filter.valueChanges.subscribe(filter => this.matTableDataSource!.filter = filter)
  }

  ngAfterViewInit() {
    // Needs to be set up after the view is initialized since the data source will look at the sort
    // and paginator's initial values to know what data should be rendered.
    this.matTableDataSource!.paginator = this.paginatorForDataSource
    this.matTableDataSource!.sort = this.sortForDataSource
  }

  ngOnInit() {
    this.connect()
  }

  addDynamicColumnDef() {
    const nextProperty = properties[this.dynamicColumnDefs.length]
    this.dynamicColumnDefs.push({
      id: nextProperty.toUpperCase(),
      property: nextProperty,
      headerText: nextProperty
    })

    this.dynamicColumnIds = this.dynamicColumnDefs.map(columnDef => columnDef.id)
  }

  removeDynamicColumnDef() {
    this.dynamicColumnDefs.pop()
    this.dynamicColumnIds.pop()
  }

  connect() {
    this.displayedColumns = ['location', 'region', 'yieldData']
    this.dataSource = new PersonDataSource(this._plantDatabase,
        this.paginator, this.sort)
    this.dataSourceWithDetails = new PersonDetailDataSource(this.dataSource)
    this._plantDatabase.initialize()
    this.matTableDataSource!.data = this._plantDatabase.data.slice()
  }

  disconnect() {
    this.dataSource = null
    this.displayedColumns = []
  }

  getOpacity(progress: number) {
    const distanceFromMiddle = Math.abs(50 - progress)
    return distanceFromMiddle / 50 + .3
  }

  userTrackBy = (index: number, item: PlantData) => {
    switch (this.trackByStrategy) {
      case 'reference': return item
      case 'index': return index
    }
  }

  toggleHighlight(property: string, enable: boolean) {
    enable ? this.highlights.add(property) : this.highlights.delete(property)
  }
}

