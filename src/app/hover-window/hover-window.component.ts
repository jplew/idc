import { Component, OnInit, Input } from '@angular/core'
import {DataSource} from '@angular/cdk/collections'

@Component({
  selector: 'app-hover-window',
  templateUrl: './hover-window.component.html'
})
export class HoverWindowComponent implements OnInit {

  @Input() location: string
  @Input() data: any

  textGreen = 'text-green'
  textRed   = 'text-red'
  circleGreen = '../../assets/images/circle-green.png'
  circleRed   = '../../assets/images/circle-red.png'

  constructor() { }

  ngOnInit() {
  }

}
