import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { GoogleMapsAPIWrapper } from '@agm/core'

@Component({
  selector: 'app-map-child',
  template: ''
})
export class MapChildComponent implements OnInit {

  @Output() onMapLoad: EventEmitter<{}> = new EventEmitter<{}>()

  constructor(public _apiWrapper: GoogleMapsAPIWrapper) {}

  ngOnInit() {
    this._apiWrapper.getNativeMap().then((map) => {
      this.onMapLoad.emit(map)
    })
  }

}
