import { Injectable } from '@angular/core'
import { MatSidenav, MatDrawerToggleResult } from '@angular/material'
// import { COLORS } from './colors'

@Injectable()
export class UiService {

  private sidenav: MatSidenav

  constructor() { }

  // getColors() {
  //   return COLORS
  // }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav
  }

  public closeWindows(loc, windows) {
    // console.log(windows)

    const thisWindow = windows.find((window) => {
      // console.log(parseInt(window._marker._id, 10) + 1)
      return ( window._marker.title ) === loc
    })

    windows.forEach(window => {
      // console.log(window._marker._id)
      window._closeInfoWindow()
    })

    // console.log(thisWindow)

    thisWindow._openInfoWindow()

  }

  public openDrawer(): Promise<MatDrawerToggleResult> {
    // console.log(this.sidenav)
    return this.sidenav.open()
  }

  public closeDrawer(): Promise<MatDrawerToggleResult> {
    return this.sidenav.close()
  }

  public toggle(isOpen?: boolean): Promise<MatDrawerToggleResult> {
    return this.sidenav.toggle(isOpen)
  }

}
