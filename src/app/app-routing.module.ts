import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventCatalogComponent } from './views/event-catalog/event-catalog.component';
import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: 'event-catalog', component: EventCatalogComponent},
  {path: '', redirectTo: '/event-catalog', pathMatch:'full'},
  {path: '**', component: PageNotFoundComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
