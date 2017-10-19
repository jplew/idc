import { Component, OnInit, Inject, Input } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styles: []
})
export class ListDialogComponent implements OnInit {

  @Input() data: any
  circleGreen = '../../assets/images/circle-green.png'
  circleRed   = '../../assets/images/circle-red.png'

  constructor() { }

  ngOnInit() {
  }

}
