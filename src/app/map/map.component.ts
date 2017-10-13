import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number
  lng: number

  markers: Marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      title: 'Buffalo',
      label: 'A',
    },
    {
      lat: 61.373858,
      lng: 8.215982,
      title: 'Buffalo',
      label: 'B',
    },
    {
      lat: 71.723858,
      lng: 9.895982,
      title: 'Buffalo',
      label: 'C',
    }
  ]

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  constructor() {
    this.lat = 51.678418
    this.lng = 7.809007
  }

  ngOnInit() {
  }

}

// just an interface for type safety.
interface Marker {
  lat: number
  lng: number
  title?: string
  label?: string
  draggable?: boolean
}
