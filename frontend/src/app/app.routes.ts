import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CategoryListComponent} from './category-list/category-list.component';
import {provideEffects} from '@ngrx/effects';
import {CategoryEffects} from './state/category/category.effects';
import {InventoryEffects} from './state/inventory/inventory.effects';
import {InventoryListComponent} from './inventory-list/inventory-list.component';
import {CategoryAddComponent} from './category-add/category-add.component';
import {ProductEffects} from './state/product/product.effects';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductAddComponent} from './product-add/product-add.component';

export const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {
    path:'dashboard',
    component: DashboardComponent,
  },
  {path: 'categories',providers:[
      provideEffects(CategoryEffects),
    ], component: CategoryListComponent
  },
  {
    path: 'category-add', providers: [
      provideEffects(CategoryEffects),
    ], component: CategoryAddComponent
  },
  {path: 'inventories',providers:[
      provideEffects(InventoryEffects),
    ], component: InventoryListComponent},
  {
    path: 'products', providers: [
      provideEffects(ProductEffects),
    ], component: ProductListComponent
  },
  {
    path: 'product-add', providers: [
      provideEffects(ProductEffects),
    ], component: ProductAddComponent
  },
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
