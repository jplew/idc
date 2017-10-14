import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { MaterialModule } from './material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager, AgmMarker } from '@agm/core'

import { NavbarComponent } from './navbar/navbar.component'
import { MapComponent } from './map/map.component'
import { MapAccessorService } from './services/map-accessor.service'
import { MarkerAccessorDirective } from './directives/marker-accessor.directive';
import { HoverWindowComponent } from './hover-window/hover-window.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapComponent,
    MarkerAccessorDirective,
    HoverWindowComponent
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
  providers: [AgmMarker, MapAccessorService, GoogleMapsAPIWrapper, MarkerManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
