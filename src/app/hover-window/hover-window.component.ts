import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-hover-window',
  templateUrl: './hover-window.component.html'
})
export class HoverWindowComponent implements OnInit {

  @Input() data: any

  constructor() { }

  ngOnInit() {
  }

}
