import { Injectable } from '@angular/core'
import { MatSidenav, MatDrawerToggleResult } from '@angular/material'

@Injectable()
export class UiService {

  constructor() { }

  private sidenav: MatSidenav

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav
  }

  public open(): Promise<MatDrawerToggleResult> {
    return this.sidenav.open()
  }

  public close(): Promise<MatDrawerToggleResult> {
    return this.sidenav.open()
  }

  public toggle(isOpen?: boolean): Promise<MatDrawerToggleResult> {
    return this.sidenav.toggle(isOpen)
  }

}
