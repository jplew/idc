import { Injectable } from '@angular/core'
import { MatSidenav, MatDrawerToggleResult } from '@angular/material'
import { COLORS } from './colors'

@Injectable()
export class UiService {

  private sidenav: MatSidenav

  constructor() { }

  getColors() {
    return COLORS
  }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav
  }

  public closeWindows(id, windows) {
    // console.log(this.sidenav)
    const thisWindow = windows.find((window) => {
      // console.log(parseInt(window._marker._id, 10) + 1)
      const windowId = parseInt(window._marker._id, 10)

      return ( windowId ) === id
    })

    windows.forEach(window => {
      // console.log(window._marker._id)
      window._closeInfoWindow()
    })

    thisWindow._openInfoWindow()

  }

  public openDrawer(): Promise<MatDrawerToggleResult> {
    // console.log(this.sidenav)
    return this.sidenav.open()
  }

  public close(): Promise<MatDrawerToggleResult> {
    return this.sidenav.open()
  }

  public toggle(isOpen?: boolean): Promise<MatDrawerToggleResult> {
    return this.sidenav.toggle(isOpen)
  }

}
