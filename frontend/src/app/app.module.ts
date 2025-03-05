import { NgModule } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, GridComponent, CanvasRenderer]);

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    TagInputModule,
    BsDatepickerModule,
    AppComponent,
    StoreModule,
    CategoryListComponent,
    InventoryListComponent,
    NgxEchartsModule.forRoot({ echarts }),
  ],
  exports: [TranslateModule],
  providers: [TranslateService, TranslateStore],
})
export class AppModule {}

bootstrapApplication(AppComponent);
