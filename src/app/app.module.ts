import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing.module";

import { AppComponent } from './app.component';
import { EventCatalogComponent } from './views/event-catalog/event-catalog.component';
import { HeaderComponent } from './views/event-catalog/header/header.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { EventCardComponent } from './views/event-catalog/event-card/event-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TagComponent } from './components/tag/tag.component';
import { FilterMenuComponent } from './views/event-catalog/filter-menu/filter-menu.component';
import {HttpClientModule} from "@angular/common/http";
import { EventDateGroupComponent } from './views/event-catalog/event-date-group/event-date-group.component';
import { ShoppingCartOverviewComponent } from './views/event-catalog/shopping-cart-overview/shopping-cart-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    EventCatalogComponent,
    HeaderComponent,
    PageNotFoundComponent,
    EventCardComponent,
    SearchBarComponent,
    OverlayComponent,
    TagComponent,
    FilterMenuComponent,
    EventDateGroupComponent,
    ShoppingCartOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
