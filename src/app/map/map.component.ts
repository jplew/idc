import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core'
import { GoogleMap } from '@agm/core/services/google-maps-types'
import { AgmMap, AgmMarker, MarkerManager, GoogleMapsAPIWrapper } from '@agm/core'
import { MapAccessorService } from '../services/map-accessor.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit, AfterViewInit {

  myMap: any
  @ViewChild(AgmMap) mapElement: AgmMap

  lat: number
  lng: number

  markers: any[] = [
    {
      lat: 49.673858,
      lng: 6.815982,
      title: 'Devil',
      label: 'D',
      data: {
        name: 'Roger',
        status: 'Sigma',
        alert: 'Alpha',
      }
    },
    {
      lat: 51.673858,
      lng: 7.815982,
      title: 'Angel',
      label: 'A',
      data: {
        name: 'Roger',
        status: 'Sigma',
        alert: 'Alpha',
      }
    },
    {
      lat: 61.373858,
      lng: 8.215982,
      title: 'Buffalo',
      label: 'B',
      data: {
        name: 'Roger',
        status: 'Sigma',
        alert: 'Alpha',
      }
    },
    {
      lat: 71.723858,
      lng: 9.895982,
      title: 'Carnival',
      label: 'C',
      data: {
        name: 'Roger',
        status: 'Sigma',
        alert: 'Alpha',
      }
    }
  ]

  tmpValue: any

  clickedMarker(label: string, latitude: number, longitude: number, index: number) {
    console.log(`clicked the marker: ${latitude}, ${longitude}, ${label}, ${index}`)
  }

  constructor(
    private _apiWrapper: GoogleMapsAPIWrapper,
    private _mapAccessor: MapAccessorService,
    private _markerManager: MarkerManager) {
    this.lat = 51.678418
    this.lng = 7.809007
  }

  ngOnInit() {

    this._apiWrapper.getNativeMap()
      .then((map: GoogleMap) => {
        this.myMap = map
        console.log(map)
        this._mapAccessor.nativeMap = map
        this._mapAccessor.markerManager = this._markerManager
      })
  }

  ngAfterViewInit(): void {
    // this.registerEventHandlers()
  }

  mapClicked($event: MouseEvent) {
    console.log('I was clicked')
    console.log(this)
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng
    // })
  }

  // google.maps.event.addListener(map, 'center_changed', function () {
  //   checkBounds(map);
  // });

  mapReady(e) {
    console.log('The Map is: ', e)
    this.myMap = e
    console.log(this.mapElement)
    // const latNorth = e.prototype.getCenter()
    // // const latSouth = this.myMap.getBounds().getSouthWest().lat()
    // console.log(latNorth)

    // console.log(this._mapAccessor.agmMarkers)
  }

  checkBounds(map) {

    // console.log(map)
    // this._map.getBounds().then( (x) => console.log(x))

    this.mapElement._mapsWrapper.setZoom(10)

    // const latNorth = this._mapsWrapper.getBounds()
    //   .then( (data) => {
    //     console.log(data)
    //   })
    //   .catch( err => console.log(err))
    //       // .then( data => data.lat())
    // console.log(latNorth)
    // latNorth.then( res => console.log(res))
    // console.log(latNorth)

    // const latNorth = map.getBounds().getNorthEast().lat()
    // const latSouth = map.getBounds().getSouthWest().lat()
    // let newLat

    // if (latNorth < 85 && latSouth > -85) {
    //   return
    // } else {
    //   if (latNorth > 85 && latSouth < -85) {
    //     return
    //   } else {
    //     if (latNorth > 85) {
    //       newLat = map.getCenter().lat() - (latNorth - 85)
    //     }
    //     if (latSouth < -85) {
    //       newLat = map.getCenter().lat() - (latSouth + 85)
    //     }
    //   }
    // }
    // if (newLat) {
    //   // const newCenter = new google.maps.LatLng(newLat, map.getCenter().lng())
    //   // map.setCenter(newCenter)
    // }
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
