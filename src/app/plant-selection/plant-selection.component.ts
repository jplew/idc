import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { UiService } from '../services/ui.service'
import { MatSidenav } from '@angular/material'
import { DataService } from '../services/data.service'

@Component({
  selector: 'app-plant-selection',
  templateUrl: './plant-selection.component.html',
  providers: [UiService, DataService]
})
export class PlantSelectionComponent implements OnInit {

  isMap: boolean
  currentPlantId: number
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
        this.currentPlant = this.dataService.plantData.find((item) => {
          return item.id === id
        })
      })
  }

  ngOnInit(): void {
    this.uiService.setSidenav(this.sidenav)
    // this.dataService.getPlants()
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
