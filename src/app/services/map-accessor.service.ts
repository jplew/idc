import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { GoogleMap } from '@agm/core/services/google-maps-types'
import { MarkerManager, AgmMarker } from '@agm/core'

@Injectable()
export class MapAccessorService {
  private _nativeMap
  private _markerManager

  agmMarkers: any[] = []
  markers: Map<any, AgmMarker> = new Map<any, AgmMarker>()
  getMarkerManager: Subject<MarkerManager> = new Subject<MarkerManager>()

  getMap: Subject<GoogleMap> = new Subject<GoogleMap>()

  set nativeMap(val: GoogleMap) {
    this._nativeMap = val
    this.getMap.next(val)
  }

  get nativeMap(): GoogleMap {
    return this._nativeMap
  }

  set markerManager(val: MarkerManager) {
    this._markerManager = val
    this.getMarkerManager.next(val)
  }

  get markerManager(): MarkerManager {
    return this._nativeMap
  }

  addMarker(location: any, marker: AgmMarker): void {
    this.markers.set(location, marker)
  }

  getMarker(location): AgmMarker {
    return this.markers.get(location)
  }

  removeMarker(location): void {
    this.markers.delete(location)
  }
}
