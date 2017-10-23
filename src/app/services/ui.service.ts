import { Injectable } from '@angular/core'
import { MatSidenav, MatDrawerToggleResult } from '@angular/material'
// import { COLORS } from './colors'

@Injectable()
export class UiService {

  private sidenav: MatSidenav

  constructor() {

  }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav
  }

  public closeAllWindows(windows) {
    windows.forEach(window => {
      window._closeInfoWindow()
    })
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

    thisWindow._openInfoWindow()

  }

  public openDrawer(): Promise<MatDrawerToggleResult> {
    return this.sidenav.open()
  }

  public closeDrawer(): Promise<MatDrawerToggleResult> {
    return this.sidenav.close()
  }

  public toggleDrawer(isOpen?: boolean): Promise<MatDrawerToggleResult> {
    return this.sidenav.toggle(isOpen)
  }

  checkDrawer(): boolean {
    return this.sidenav.opened
  }

}
