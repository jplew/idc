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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [PlantSearchService]
})
export class NavbarComponent implements OnInit {

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

    this.sidenavOpen = this.uiService.checkDrawer()

    const id = plant.id
    const loc = plant.location

    this.dataService.changePlant(id)

    if ( this.sidenavOpen === true &&
         this.dataService.currentPlantId === id) {
      this.uiService.closeDrawer()
    } else {
      this.uiService.openDrawer()
    }

    this.dataService.currentPlantId = id
  }

}
