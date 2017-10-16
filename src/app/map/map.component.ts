import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren } from '@angular/core'
import { GoogleMap } from '@agm/core/services/google-maps-types'
import { AgmMap, AgmMarker, MarkerManager, GoogleMapsAPIWrapper, AgmInfoWindow } from '@agm/core'
import { MapAccessorService } from '../services/map-accessor.service'
import { UiService } from '../services/ui.service'
import { DataService } from '../services/data.service'
import { AgmSnazzyInfoWindow } from '@agm/snazzy-info-window'
import 'rxjs/add/operator/map'

declare var google: any

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.css'],
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit, AfterViewInit {

  map: any
  @ViewChild(AgmMap) mapElement: any
  @ViewChildren(AgmInfoWindow) infoWindow: any
  @ViewChildren(AgmSnazzyInfoWindow) snazzyIW: any

  centerLat: number
  centerLng: number
  latNorth: number
  latSouth: number

  markers: any[]

  lat: number
  lng: number

  iconGood = '../../assets/images/location-green.png'
  iconBad  = '../../assets/images/location-red.png'

  constructor(
    private dataService: DataService,
    private uiService: UiService,
    private _apiWrapper: GoogleMapsAPIWrapper,
    private _mapAccessor: MapAccessorService,
    private _markerManager: MarkerManager) {
    this.lat = 51.678418
    this.lng = 7.809007
  }

  public loadAPIWrapper(map) {
    this.map = map
  }
  public markerClicked = (markerObj) => {

    this.uiService.closeDrawer()

    const id = markerObj.id
    this.uiService.closeWindows(id, this.snazzyIW)
    this.dataService.currentPlantId = id
    this.dataService.changePlant(id)
    // console.log(markerObj)
    this.uiService.openDrawer()
    // console.log(this.snazzyIW)

    // hoverWindow.close(map, marker);

    // pretty cool, uncomment this to pan to location on each marker click
    // const position = new google.maps.LatLng(markerObj.lat, markerObj.lng)
    // this.map.panTo(position)
  }

  ngOnInit() {
    /*
    * remap the data to determine whether this is a green or a red plant. Green
    * corresponds to an FPY value greater than 70, red to an FPY value less than
    * 70. App will update the UI based on the 'isGoodYield' boolean introduced
    * here. */
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
          this.markers = response
          // console.log(this.markers)
        },
        error => {
          console.log(error)
        })

    // this._apiWrapper.getNativeMap()
    //   .then((map: GoogleMap) => {
    //     this.myMap = map
    //     console.log(map)
    //     this._mapAccessor.nativeMap = map
    //     this._mapAccessor.markerManager = this._markerManager
    //   })
  }

  ngAfterViewInit(): void {
    // this.registerEventHandlers()
  }

  mapClicked($event: MouseEvent) {
    // console.log('I was clicked')
    // this.infoWindow.forEach(element => {
    //   element.close()
    // })
    this.uiService.toggle()
  }

  checkBounds() {

    const map = this.mapElement._mapsWrapper
    const ln = map.getBounds()
      .then((latLngBounds) => {
        return latLngBounds.getNorthEast().lat()
      })
    ln.then(x => this.latNorth = x)

    const ls = map.getBounds()
      .then((latLngBounds) => {
        return latLngBounds.getSouthWest().lat()
      })
    ls.then(x => this.latSouth = x)

    // console.log('Lat North: ', this.latNorth)
    // console.log('Lat South: ', this.latSouth)

    let newLat

    if (this.latNorth < 85 && this.latSouth > -85) {
      return
    } else {
      if (this.latNorth > 85 && this.latSouth < -85) {
        return
      } else {
        if (this.latNorth > 85) {

          map.getCenter().then((center) => {
            this.centerLat = center.lat()
            this.centerLng = center.lng()
          })
          newLat = this.centerLat - (this.latNorth - 85)
        }
        if (this.latSouth < -85) {

          map.getCenter().then((center) => {
            this.centerLat = center.lat()
            this.centerLng = center.lng()
          })
          newLat = this.centerLat - (this.latSouth - 85)
        }
      }
    }
    if (newLat) {
      const newCenter = new google.maps.LatLng(newLat, this.centerLng)
      map.setCenter(newCenter)
    }
  }


  // addMarker(marker: AgmMarker) {
  //   const markerPromise = this._mapsWrapper.createMarker({
  //     position: {lat: marker.latitude, lng: marker.longitude},
  //     label: marker.label,
  //     draggable: marker.draggable,
  //     icon: marker.iconUrl,
  //     opacity: marker.opacity,
  //     visible: marker.visible,
  //     zIndex: marker.zIndex,
  //     title: marker.title,
  //     clickable: marker.clickable
  //   })
  //   this._markers.set(marker, markerPromise);
  // }

  setMarkerFocus(location: any): void {
    const marker = this._mapAccessor.getMarker(location)
    this._markerManager.getNativeMarker(marker)
    // .then((_marker: any) => {
    //   _marker.setAnimation(google.maps.Animation.BOUNCE)
    //   this.googleMap.panTo(location)
  }
}


// just an interface for type safety.
// interface Marker {
//   lat: number
//   lng: number
//   title?: string
//   label?: string
//   draggable?: boolean
// }
