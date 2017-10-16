import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from './material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager, AgmMarker } from '@agm/core'
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window'
import { TreeModule } from 'angular-tree-component'

import { MapAccessorService } from './services/map-accessor.service'
import { UiService } from './services/ui.service'
import { DataService } from './services/data.service'

import { AppComponent } from './app.component'
import { NavbarComponent } from './navbar/navbar.component'
import { MapComponent } from './map/map.component'
import { HoverWindowComponent } from './hover-window/hover-window.component'
import { MapChildComponent } from './map-child/map-child.component'
import { HoverTableComponent } from './hover-table/hover-table.component'
import { ClickWindowComponent } from './click-window/click-window.component'
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component'

import { MarkerAccessorDirective } from './directives/marker-accessor.directive'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapComponent,
    MarkerAccessorDirective,
    HoverWindowComponent,
    MapChildComponent,
    HoverTableComponent,
    ClickWindowComponent,
    SidenavContentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD6PIv2LqGHNs_UVGWJo4vcACTXeh5fmys'
    }),
    AgmSnazzyInfoWindowModule,
    TreeModule
  ],
  providers: [
    AgmMarker,
    MapAccessorService,
    GoogleMapsAPIWrapper,
    MarkerManager,
    UiService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
