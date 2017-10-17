import { NgModule } from '@angular/core'
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonToggleModule,
  MatTableModule,
  MatSidenavModule,
  MatPaginatorModule,
} from '@angular/material'
import {
  CdkTableModule
} from '@angular/cdk/table'


@NgModule({
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSidenavModule,
    MatPaginatorModule,
    CdkTableModule,
  ]
})
export class MaterialModule { }
