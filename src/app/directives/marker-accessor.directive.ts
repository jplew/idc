import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  Input,
  OnDestroy,
  ViewChildren,
  ContentChildren,
  AfterContentInit
} from '@angular/core'
import { MarkerManager, AgmMarker, GoogleMapsAPIWrapper } from '@agm/core'
import { MapAccessorService } from '../services/map-accessor.service'
import { AgmSnazzyInfoWindow } from '@agm/snazzy-info-window'
import { DataService } from '../services/data.service'

@Directive({
  selector: '[appMarkerAccessor]'
})
export class MarkerAccessorDirective implements OnDestroy, AfterContentInit {

  @Input() appMarkerAccessor: any
  @ContentChildren(AgmSnazzyInfoWindow) snazzyIW: any

  constructor(
    private dataService: DataService,
    @Host() private _markerComponent: AgmMarker,
    private _mapsWrapper: GoogleMapsAPIWrapper,
    private _mapAccessor: MapAccessorService,
    private _manager: MarkerManager,
    private el: ElementRef
  ) {
    // console.log(el.nativeElement)
    // this._mapAccessor.agmMarkers.push(el.nativeElement)
  }

  ngAfterContentInit(): void {

    this._mapsWrapper.getNativeMap()
      .then((map) => {
        this._manager.getNativeMarker(this._markerComponent)
          .then((marker) => {

            this.dataService.nativeMarkers.push(marker)

            // console.log(this.dataService.nativeMarkers)

            const clickWindow = this.snazzyIW.find((item) => {
              return item.maxWidth === 700
            })
            this.dataService.clickWindows.push(clickWindow)

            const hoverWindow = this.snazzyIW.find((item) => {
              return item.maxWidth === 900
            })

            marker.addListener('mouseover', () => {
              if (clickWindow.openStatus() === false) {
                hoverWindow._openInfoWindow()
              }
            })
            marker.addListener('mouseout', () => {
              if (clickWindow.openStatus() === false) {
                hoverWindow._closeInfoWindow()
              }
            })

          })
      })

  }

  ngOnDestroy(): void {
    this._mapAccessor.removeMarker(this.appMarkerAccessor)
  }
}
