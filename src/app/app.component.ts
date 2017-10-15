import { Component, OnInit, ViewChild } from '@angular/core'
import { UiService } from './services/ui.service'
import { MatSidenav } from '@angular/material'
import { DataService } from './services/data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UiService]
})
export class AppComponent implements OnInit {
  title = 'app'

  data = 'Hello Sidenav'
  plantData: any

  @ViewChild( MatSidenav ) public sidenav: MatSidenav

  constructor(
    private dataService: DataService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    // console.log(this.sidenav)
    this.uiService.setSidenav(this.sidenav)
    this.getPlantData()
  }

  getPlantData() {
    this.dataService.getAll()
      .map( res => {
        const obj = res.json()
        obj.forEach(element => {
          const fpyRow = element.yieldData.find(({cat}) => {
            return cat === 'FPY'
          })
          element.isGoodYield = ( fpyRow.value > 70 ) ? true : false
        })
        return obj
      })
      .subscribe(
        response => {
          // this 'markers' object will be sent to Google Maps to generate markers
          this.plantData = response
          // console.log(this.plantData)
        },
        error => {
          console.log(error)
        })

    return this.plantData
  }

}
