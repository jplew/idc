import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { UiService } from '../services/ui.service'
import { MatSidenav } from '@angular/material'
import { DataService } from '../services/data.service'

@Component({
  selector: 'app-plant-selection',
  templateUrl: './plant-selection.component.html',
})
export class PlantSelectionComponent implements OnInit {

  isMap: boolean
  currentPlantId: number
  currentPlantLocation: string
  currentPlant: any
  plantData: any
  isMapHidden: boolean
  isListHidden: boolean

  @ViewChild(MatSidenav) public sidenav: MatSidenav

  constructor(
    private dataService: DataService,
    private uiService: UiService
  ) {
    this.plantData = this.dataService.plantData
    this.currentPlant = {}
    this.isMap = true
    // this.isMapHidden = true
    // this.isListHidden = false
    this.isMapHidden = false
    this.isListHidden = true

    dataService.plantChanged$.subscribe(
      id => {
        this.currentPlantId = id
        this.dataService.getPlant(id)
          .then( res => this.currentPlant = res )
          .catch(this.handleError)
      })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error) // for demo purposes only
    return Promise.reject(error.message || error)
  }

  ngOnInit(): void {
    this.uiService.setSidenav(this.sidenav)
  }
  showView(view) {
    if (view === 'map') {
      this.isMapHidden = false
      this.isListHidden = true
    } else {
      this.isMapHidden = true
      this.isListHidden = false
    }
  }

}
