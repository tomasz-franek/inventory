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
import {StorageEffects} from './state/storage/storage.effects';
import {StoragesListComponent} from './storages-list/storages-list.component';
import {StoragesAddComponent} from './storages-add/storages-add.component';
import {ManageProductComponent} from './manage-product/manage-product.component';
import {ManageInventoryComponent} from './manage-inventory/manage-inventory.component';
import {UserPropertiesComponent} from './user-properties/user-properties.component';

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
  {
    path: 'storages', providers: [
      provideEffects(StorageEffects),
    ], component: StoragesListComponent
  },
  {
    path: 'storages-add', providers: [
      provideEffects(StorageEffects),
    ], component: StoragesAddComponent
  },
  {
    path: 'manage-product', providers: [
      provideEffects(ProductEffects),
    ], component: ManageProductComponent
  },
  {
    path: 'manage-inventory', providers: [
      provideEffects(InventoryEffects),
    ], component: ManageInventoryComponent
  },
  {
    path: 'user-properties', providers: [], component: UserPropertiesComponent
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
