import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.css']
})
export class SidenavContentComponent implements OnInit {

  @Input() data: any

  constructor() {
    this.data = []
  }

  ngOnInit() {
  }

}
