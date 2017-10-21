import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavContentComponent implements OnInit {

  @Input() data: any

  constructor() {
    this.data = []
  }

  ngOnInit() {
  }

}
