import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { UiService } from './services/ui.service'
import { MatSidenav } from '@angular/material'
import { DataService } from './services/data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UiService, DataService]
})
export class AppComponent implements OnInit {
  title = 'app'

  currentPlantId: number
  currentPlant: any
  plantData: any

  @ViewChild(MatSidenav) public sidenav: MatSidenav

  constructor(
    private dataService: DataService,
    private uiService: UiService
  ) {
    this.plantData = this.dataService.plantData
    this.currentPlant = {}

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
    this.dataService.getPlants()
  }

}
