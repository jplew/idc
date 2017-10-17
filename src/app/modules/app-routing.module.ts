import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PageNotFoundComponent } from '../page-not-found/page-not-found.component'
import { MapViewComponent } from '../map-view/map-view.component'
import { MapComponent } from '../map/map.component'
import { ListViewComponent } from '../list-view/list-view.component'
import { PlantSelectionComponent } from '../plant-selection/plant-selection.component'

// import { ComposeMessageComponent } from './compose-message.component'

// import { CanDeactivateGuard } from './can-deactivate-guard.service'
// import { AuthGuard } from './auth-guard.service'
// import { SelectivePreloadingStrategy } from './selective-preloading-strategy'
// {
//   path: '',
//   redirectTo: '/map',
//   pathMatch: 'full'
// },

const appRoutes: Routes = [
  // {
  //   path: 'list',
  //   component: ListViewComponent
  // },
  {
    path: '',
    component: PlantSelectionComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
        // preloadingStrategy: SelectivePreloadingStrategy,

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // CanDeactivateGuard,
    // SelectivePreloadingStrategy
  ],
  declarations: []
})
export class AppRoutingModule { }

  // {
  //   path: 'compose',
  //   component: ComposeMessageComponent,
  //   outlet: 'popup'
  // },
  // {
  //   path: 'admin',
  //   loadChildren: 'app/admin/admin.module#AdminModule',
  //   canLoad: [AuthGuard]
  // },
  // {
  //   path: 'crisis-center',
  //   loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule',
  //   data: { preload: true }
  // }
