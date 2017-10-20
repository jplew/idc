import {Component, ViewChild, AfterViewInit, OnInit, Input, Inject} from '@angular/core'
import {PersonDataSource} from '../services/person-data-source'
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material'
import {DetailRow, PersonDetailDataSource} from '../services/person-detail-data-source'
import {animate, state, style, transition, trigger} from '@angular/animations'
import {FormControl} from '@angular/forms'
import { ListDialogComponent } from '../list-dialog/list-dialog.component'
import { UiService } from '../services/ui.service'
import { DataService } from '../services/data.service'
import { PlantData } from '../services/in-mem-plant.service'

export type UserProperties = 'arrow' | 'location' | 'region' | 'yieldData' | undefined

export type TrackByStrategy = 'reference' | 'index'

const properties = ['arrow', 'location', 'region', 'yieldData']

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

  // dataSource: PersonDataSource | null
  // dataSourceWithDetails: PersonDetailDataSource | null
  matTableDataSource = new MatTableDataSource<PlantData>()
  displayedColumns: UserProperties[] = []
  trackByStrategy: TrackByStrategy = 'reference'
  changeReferences = false
  highlights = new Set<string>()
  wasExpanded = new Set<PlantData>()
  sidenavOpen: any
  plants: PlantData[]

  filter = new FormControl()

  dynamicColumnDefs: any[] = []
  dynamicColumnIds: string[] = []

  expandedPerson: PlantData

  dialogRef: MatDialogRef<ListDialogComponent> | null

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('paginatorForDataSource') paginatorForDataSource: MatPaginator
  @ViewChild('sortForDataSource') sortForDataSource: MatSort

  @Input() isHiddenBool: boolean

  isDetailRow = (row: DetailRow|PlantData) => row.hasOwnProperty('detailRow')

  constructor(
    public dialog: MatDialog,
    private uiService: UiService,
    private dataService: DataService
    ) {
    this.sidenavOpen = false
    this.matTableDataSource.sortingDataAccessor = (data: PlantData, property: string) => {
      switch (property) {
        case 'location': return data.location
        case 'region': return data.region
        case 'yieldData': return data.yieldData[4].value
        default: return ''
      }
    }
    this.matTableDataSource.filterTermAccessor = (data: PlantData) => data.location
    this.filter.valueChanges.subscribe(filter => this.matTableDataSource!.filter = filter)
    this.toggleHighlight('even', true)
  }

  ngAfterViewInit() {
    // Needs to be set up after the view is initialized since the data source will look at the sort
    // and paginator's initial values to know what data should be rendered.
    this.matTableDataSource!.paginator = this.paginatorForDataSource
    // console.log(this.paginatorForDataSource)

    this.matTableDataSource!.sort = this.sortForDataSource
    // console.log(this.sortForDataSource)
  }

  ngOnInit() {
    this.connect()
  }

  onClick(id) {

    this.dataService.changePlant(id)
    this.sidenavOpen = this.uiService.checkDrawer()

    if (this.sidenavOpen === true && this.dataService.currentPlantId === id) {
      this.uiService.closeDrawer()
    } else {
      this.uiService.openDrawer()
    }

    this.dataService.currentPlantId = id

  }

  connect() {
    this.displayedColumns = ['arrow', 'location', 'region', 'yieldData']
    this.dataService.getPlants()
      .then( res => {
        this.plants = res
        // console.log(res)
      })
      .catch(this.handleError)

    this.matTableDataSource!.data = this.plants
  }

  disconnect() {
    this.displayedColumns = []
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error) // for demo purposes only
    return Promise.reject(error.message || error)
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
