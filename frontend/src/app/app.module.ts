import {NgModule} from '@angular/core';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {AppRoutingModule} from './app.routes';
import {CategoryListComponent} from './category-list/category-list.component';
import {InventoryListComponent} from './inventory-list/inventory-list.component';
import {TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    StoreModule,
    CategoryListComponent,
    InventoryListComponent
  ],
  exports: [TranslateModule],
  providers: [TranslateService, TranslateStore]
})

export class AppModule {
}

bootstrapApplication(AppComponent)
