import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, OnDestroy, AfterContentInit, Input } from '@angular/core'
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
export class MapComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  myMarkers: any

  map: any
  @ViewChild(AgmMap) mapElement: any
  @ViewChildren(AgmInfoWindow) infoWindow: any
  @ViewChildren(AgmSnazzyInfoWindow) snazzyIW: any
  @ViewChildren(AgmMarker) agmMarkers: any
  @Input() isHiddenBool: boolean

  centerLat: number
  centerLng: number
  latNorth: number
  latSouth: number
  sidenavOpen: boolean

  markers: any[]

  lat: number
  lng: number

  iconGood = '../../assets/images/location-green.png'
  iconBad = '../../assets/images/location-red.png'

  constructor(
    private dataService: DataService,
    private uiService: UiService,
    private _apiWrapper: GoogleMapsAPIWrapper,
    private _mapAccessor: MapAccessorService,
    private _markerManager: MarkerManager
    ) {
    this.sidenavOpen = false
    this.lat = 51.678418
    this.lng = 7.809007
  }

  public loadAPIWrapper(map) {
    this.map = map
  }

  markerClicked = (markerObj) => {
    this.sidenavOpen = this.uiService.checkDrawer()
    console.log(markerObj)

    const id = markerObj.id
    const loc = markerObj.location
    this.uiService.closeWindows(loc, this.snazzyIW)

    this.dataService.changePlant(id)

    if (this.sidenavOpen === true && this.dataService.currentPlantId === id) {
      this.uiService.closeDrawer()
    } else {
      this.uiService.openDrawer()
    }

    this.dataService.currentPlantId = id

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

    this.dataService.getPlants()
      .then(res => {
        res.forEach(element => {
          const fpyRow = element.yieldData.find(({ cat }) => {
            return cat === 'FPY'
          })
          element.isGoodYield = (fpyRow.value > 70) ? true : false
        })
        return res
      })
      .then(
      response => {
        // this 'markers' object will be sent to Google Maps to generate markers
        this.markers = response
        this.dataService.plantData = response
        // console.log(this.markers)
      },
      error => {
        console.log(error)
      })

  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
    // this.registerEventHandlers()
    // console.log('Create! ', this.agmMarkers)

    this._apiWrapper.getNativeMap()
      .then((map: GoogleMap) => {
        this.map = map
        console.log(map)
        this._mapAccessor.nativeMap = map
        // this._mapAccessor.markerManager = this._markerManager

        this.agmMarkers.forEach(element => {
          console.log(element)
        })
        //   console.log('Heyo', this._markerManager.getNativeMarker(element))

      })

    // this.myMarkers = this.agmMarkers
    // for (const i of this.agmMarkers) {
    //   console.log(i)
    // }
    // this.agmMarkers.forEach(element => {
    //   console.log(element)
    // })

    // this.myMarkers = this.agmMarkers.foreach(element => {
    //   // console.log(element)
    //   // this._markerManager.getNativeMarker(element)
    //   console.log('Heyo', this._markerManager.getNativeMarker(element))
    //   // return this._markerManager.getNativeMarker(element)
    //   //  this._markerManager.getNativeMarker(element)
    //   // .then( marker => marker )
    // })
    // console.log(this.myMarkers)

  }

  ngOnDestroy(): void {

    // console.log(this.agmMarkers)
    // console.log(this.dataService.nativeMarkers)

    this.dataService.nativeMarkers.forEach(element => {
      element.setMap(null)
      element = null
    })
    this.dataService.nativeMarkers.length = 0
    // console.log(this.map)
    this.agmMarkers = []
    this.agmMarkers.length = 0

    // console.log('Destroy! ', this.agmMarkers)

    // console.log(this._mapAccessor.markers.values())

    // console.log(this._markerManager)

    // this._mapAccessor.nativeMap = this.map

    // console.log(this._mapAccessor.markerManager)
    // this._markerManager = this._mapAccessor.markerManager

    // const nativeMarkers = this.agmMarkers.foreach(element => {
    //   console.log(element)
    //   this._markerManager.getNativeMarker(element)
    //   console.log('Heyo', this._markerManager.getNativeMarker(element))
    //   // return this._markerManager.getNativeMarker(element)
    //   //  this._markerManager.getNativeMarker(element)
    //   // .then( marker => marker )
    // })
    // console.log(nativeMarkers)

  }


  // ngOnDestroy(): void {
  //   this.snazzyIW = []
  // }

  mapClicked($event: MouseEvent) {
    // console.log('I was clicked')
    // this.infoWindow.forEach(element => {
    //   element.close()
    // })
    this.uiService.toggleDrawer()
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
