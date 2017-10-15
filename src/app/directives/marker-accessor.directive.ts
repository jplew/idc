import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChildren,
  ContentChildren,
  AfterContentInit
} from '@angular/core'
import { MarkerManager, AgmMarker, GoogleMapsAPIWrapper } from '@agm/core'
import { MapAccessorService } from '../services/map-accessor.service'
import { AgmSnazzyInfoWindow } from '@agm/snazzy-info-window'

@Directive({
  selector: '[appMarkerAccessor]'
})
export class MarkerAccessorDirective implements OnInit, OnDestroy, AfterContentInit {

  @Input() appMarkerAccessor: any
  @ContentChildren(AgmSnazzyInfoWindow) snazzyIW: any

  constructor(
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
            const options = {content: this.el.nativeElement.querySelector('.hover-window-content')}

            // console.log(marker)

            // console.log(this.snazzyIW)

            const clickWindow = this.snazzyIW.find((item) => {
              return item.maxWidth === 700
            })
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
            // marker.addListener('click', () => {
            //   hoverWindow.close()
            // })

          })
      })

  }

  ngOnInit(): void {

    // this._mapsWrapper.getNativeMap()
    //   .then((map) => {
    //     this._manager.getNativeMarker(this._markerComponent)
    //       .then((marker) => {
    //         const options = {content: this.el.nativeElement.querySelector('.hover-window-content')}
    //         this._mapsWrapper.createInfoWindow(options)
    //         .then( (w) => {
    //           marker.addListener('mouseover', () => {
    //             w.open(map, marker)
    //           })
    //           marker.addListener('mouseout', () => {
    //             w.close()
    //           })
    //           marker.addListener('click', () => {
    //             w.close()
    //           })
    //         })
    //       })
    //   })

  }

  ngOnDestroy(): void {
    this._mapAccessor.removeMarker(this.appMarkerAccessor)
  }
}
