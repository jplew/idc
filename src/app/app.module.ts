import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { MaterialModule } from './material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AgmCoreModule } from '@agm/core'

import { NavbarComponent } from './navbar/navbar.component'
import { MapComponent } from './map/map.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD6PIv2LqGHNs_UVGWJo4vcACTXeh5fmys'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
