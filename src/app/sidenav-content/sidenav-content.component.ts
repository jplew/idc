import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styles: []
})
export class SidenavContentComponent implements OnInit {

  @Input() data: any

  constructor() { }

  ngOnInit() {
  }

}
