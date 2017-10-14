import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core'
import { MarkerManager, AgmMarker, GoogleMapsAPIWrapper } from '@agm/core'
import { MapAccessorService } from '../services/map-accessor.service'

@Directive({
  selector: '[appMarkerAccessor]'
})
export class MarkerAccessorDirective implements OnInit, OnDestroy {

  @Input() appMarkerAccessor: any

  constructor(
    @Host() private _markerComponent: AgmMarker,
    private _mapsWrapper: GoogleMapsAPIWrapper,
    private _mapAccessor: MapAccessorService,
    private _manager: MarkerManager,
    private el: ElementRef
  ) {
    // console.log(el.nativeElement)
    this._mapAccessor.agmMarkers.push(el.nativeElement)
  }

  ngOnInit(): void {
    this._mapAccessor.addMarker(this.appMarkerAccessor, this._markerComponent)
    const myMarker = this._mapAccessor.getMarker(this.appMarkerAccessor)
    console.log(myMarker)

    // console.log(this._mapAccessor.getMarkerManager)

    // const nativeMarker = this._manager.getNativeMarker(this._markerComponent)
    // console.log(nativeMarker)

    // this._infoWindows.get(infoWindow).then((w) => {

    // console.log(this.el.nativeElement.querySelector('.agm-info-window-content'))

    // console.log(this.el.nativeElement.getAttribute('latitude'))

    this._mapsWrapper.getNativeMap()
      .then((map) => {
        this._manager.getNativeMarker(this._markerComponent)
          .then((marker) => {
            const options = {content: this.el.nativeElement.querySelector('.hover-window-content')}
            this._mapsWrapper.createInfoWindow(options)
            .then( (w) => {
              marker.addListener('mouseover', () => {
                w.open(map, marker)
              })
              marker.addListener('mouseout', () => {
                w.close()
              })
            })
          })
      })

    //   w.open(map, marker))
    //       console.log(marker)
    //   })
    // this._mapsWrapper.getNativeMap().then((map) => w.open(map, marker));

  }

  ngOnDestroy(): void {
    this._mapAccessor.removeMarker(this.appMarkerAccessor)
  }
}
