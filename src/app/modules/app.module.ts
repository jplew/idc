import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { MaterialModule } from './material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager, AgmMarker } from '@agm/core'
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window'
import { TreeModule } from 'angular-tree-component'

import { MapAccessorService } from '../services/map-accessor.service'
import { UiService } from '../services/ui.service'
import { DataService } from '../services/data.service'
import { PlantDatabase } from '../services/plant-database'

import { MarkerAccessorDirective } from '../directives/marker-accessor.directive'

import { AppComponent } from '../app.component'
import { NavbarComponent } from '../navbar/navbar.component'
import { MapComponent } from '../map/map.component'
import { HoverWindowComponent } from '../hover-window/hover-window.component'
import { MapChildComponent } from '../map-child/map-child.component'
import { HoverTableComponent } from '../hover-table/hover-table.component'
import { ClickWindowComponent } from '../click-window/click-window.component'
import { SidenavContentComponent } from '../sidenav-content/sidenav-content.component'
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component'
import { MapViewComponent } from '../map-view/map-view.component'
import { ListViewComponent } from '../list-view/list-view.component'
import { PlantSelectionComponent } from '../plant-selection/plant-selection.component'
import { TableDemoComponent } from '../table-demo/table-demo.component'
import { ListDialogComponent } from '../list-dialog/list-dialog.component'
import { ListDialogPlantComponent } from '../list-dialog-plant/list-dialog-plant.component'

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
    SidenavContentComponent,
    PageNotFoundComponent,
    MapViewComponent,
    ListViewComponent,
    PlantSelectionComponent,
    TableDemoComponent,
    ListDialogComponent,
    ListDialogPlantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD6PIv2LqGHNs_UVGWJo4vcACTXeh5fmys'
    }),
    AgmSnazzyInfoWindowModule,
    TreeModule,
    ReactiveFormsModule
  ],
  providers: [
    AgmMarker,
    MapAccessorService,
    GoogleMapsAPIWrapper,
    MarkerManager,
    UiService,
    DataService,
    PlantDatabase
  ],
  entryComponents: [
    ListDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
