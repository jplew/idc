import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { UiService } from '../services/ui.service'
import { DataService } from '../services/data.service'

// Observable class extensions
import 'rxjs/add/observable/of'

// Observable operators
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'

import { PlantSearchService } from '../services/plant-search.service'
import { PlantData } from '../services/in-mem-plant.service'

declare var google: any

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styles: [`
    input.mat-input-element {
      color: #555;
    }
    `
  ],
  providers: [PlantSearchService]
})
export class SearchFieldComponent implements OnInit {

  plants: Observable<PlantData[]>
  sidenavOpen: boolean
  private searchTerms = new Subject<string>()

  constructor(
    private plantSearchService: PlantSearchService,
    private dataService: DataService,
    private uiService: UiService,
  ) {
    this.sidenavOpen = false
  }

  ngOnInit() {
    this.plants = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.plantSearchService.search(term)
        : Observable.of<PlantData[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error)
        return Observable.of<PlantData[]>([])
      })
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term)
  }

  getPlantDetails(plant) {

    this.dataService.clickWindows.forEach(window => {
      // console.log(window._marker._id)
      window._closeInfoWindow()
    })

    const clickWindow = this.dataService.clickWindows.find( x => {
      return x._marker.title === plant.name
    })
    // console.log(clickWindow)
    clickWindow._openInfoWindow()

    this.dataService.changeLatLng([plant.lat, plant.lng])

    this.sidenavOpen = this.uiService.checkDrawer()
    this.uiService.closeDrawer()

    const id = plant.id
    const loc = plant.location

    this.dataService.changePlant(id)

    if ( this.sidenavOpen === true &&
         this.dataService.currentPlantId === id) {
      this.uiService.closeDrawer()
    } else {
      setTimeout( () => {
        this.uiService.openDrawer()
      }, 350)
    }

    this.dataService.currentPlantId = id

  }

}
