import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-click-window',
  templateUrl: './click-window.component.html'
})
export class ClickWindowComponent implements OnInit {

  @Input() data: any
  constructor() { }

  ngOnInit() {
  }

  getValue(data, cat) {
    const obj = data.find((item) => {
      return item.cat === cat
    })
    return obj.value
  }

}
