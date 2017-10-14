import { Component, OnInit, ViewChild } from '@angular/core'
import { UiService } from './services/ui.service'
import { MatSidenav } from '@angular/material'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UiService]
})
export class AppComponent implements OnInit {
  title = 'app'

  // @ViewChild(MatSidenav) public sidenav: MatSidenav

  constructor(private uiService: UiService) {

  }

  ngOnInit(): void {
    // console.log(this.sidenav)
    // this.uiService.setSidenav(this.sidenav)
  }

}
