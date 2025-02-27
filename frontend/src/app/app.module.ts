import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app.routes';
import { CategoryListComponent } from './category-list/category-list.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import {
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TagInputModule,
    BrowserAnimationsModule,
    AppComponent,
    StoreModule,
    CategoryListComponent,
    InventoryListComponent,
  ],
  exports: [TranslateModule],
  providers: [TranslateService, TranslateStore],
})
export class AppModule {}

bootstrapApplication(AppComponent, {
  providers: [provideAnimationsAsync()],
});
