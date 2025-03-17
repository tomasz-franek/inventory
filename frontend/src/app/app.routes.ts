import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { provideEffects } from '@ngrx/effects';
import { CategoryEffects } from './state/category/category.effects';
import { InventoryEffects } from './state/inventory/inventory.effects';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { ProductEffects } from './state/product/product.effects';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { StorageEffects } from './state/storage/storage.effects';
import { StoragesListComponent } from './storages-list/storages-list.component';
import { StoragesAddComponent } from './storages-add/storages-add.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageInventoryComponent } from './manage-inventory/manage-inventory.component';
import { UserPropertiesComponent } from './user-properties/user-properties.component';
import { ConsumeProductComponent } from './consume-product/consume-product.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ExpiredProductsComponent } from './expired-products/expired-products.component';
import { LastUsedComponent } from './last-used/last-used.component';
import { ProductPredictionComponent } from './product-prediction/product-prediction.component';
import { AvailabilityComponent } from './availability/availability.component';
import { NextDaysExpiredComponent } from './next-days-expired/next-days-expired.component';
import { SumStorageComponent } from './sum-storage/sum-storage.component';
import { ValueHistoryComponent } from './value-history/value-history.component';
import { PriceHistoryComponent } from './price-history/price-history.component';
import { SumCategoriesComponent } from './sum-categories/sum-categories.component';
import { InventoryAddComponent } from './inventory-add/inventory-add.component';
import { UnitEffects } from './state/unit/unit.effects';
import { PropertyEffects } from './state/property/property.effects';
import { ShoppingAddComponent } from './shopping-add/shopping-add.component';
import { ShoppingEffects } from './state/shopping/shopping.effects';
import { ItemsEffects } from './state/item/item.effects';
import { ReportEffects } from './state/report/report.effects';

export const appRoutes: Routes = [
  {
    path: '',
    providers: [
      provideEffects(ShoppingEffects, ReportEffects, CategoryEffects),
    ],
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    providers: [
      provideEffects(ShoppingEffects, ReportEffects, CategoryEffects),
    ],
    component: DashboardComponent,
  },
  {
    path: 'categories',
    providers: [provideEffects(CategoryEffects)],
    component: CategoryListComponent,
  },
  {
    path: 'category-add',
    providers: [provideEffects(CategoryEffects)],
    component: CategoryAddComponent,
  },
  {
    path: 'category-add/:id',
    providers: [provideEffects(CategoryEffects)],
    component: CategoryAddComponent,
  },
  {
    path: 'inventories',
    providers: [provideEffects(InventoryEffects)],
    component: InventoryListComponent,
  },
  {
    path: 'inventory-add',
    providers: [provideEffects(InventoryEffects)],
    component: InventoryAddComponent,
  },
  {
    path: 'inventory-add/:id',
    providers: [provideEffects(InventoryEffects)],
    component: InventoryAddComponent,
  },
  {
    path: 'products',
    providers: [provideEffects(ProductEffects, CategoryEffects)],
    component: ProductListComponent,
  },
  {
    path: 'product-add',
    providers: [provideEffects(ProductEffects, CategoryEffects)],
    component: ProductAddComponent,
  },
  {
    path: 'product-add/:id',
    providers: [provideEffects(ProductEffects, CategoryEffects)],
    component: ProductAddComponent,
  },
  {
    path: 'storages',
    providers: [
      provideEffects(StorageEffects, ProductEffects, CategoryEffects),
    ],
    component: StoragesListComponent,
  },
  {
    path: 'storages-add',
    providers: [
      provideEffects(
        StorageEffects,
        ProductEffects,
        CategoryEffects,
        UnitEffects,
        InventoryEffects
      ),
    ],
    component: StoragesAddComponent,
  },
  {
    path: 'storages-add/:id',
    providers: [
      provideEffects(
        StorageEffects,
        ProductEffects,
        CategoryEffects,
        UnitEffects,
        InventoryEffects
      ),
    ],
    component: StoragesAddComponent,
  },
  {
    path: 'manage-product',
    providers: [provideEffects(InventoryEffects, ItemsEffects)],
    component: ManageProductComponent,
  },
  {
    path: 'manage-inventory',
    providers: [provideEffects(ReportEffects, CategoryEffects, ProductEffects)],
    component: ManageInventoryComponent,
  },
  {
    path: 'consume-product',
    providers: [
      provideEffects(
        ProductEffects,
        CategoryEffects,
        InventoryEffects,
        ShoppingEffects,
        ItemsEffects
      ),
    ],
    component: ConsumeProductComponent,
  },
  {
    path: 'shopping',
    providers: [provideEffects(ProductEffects, ShoppingEffects, UnitEffects)],
    component: ShoppingListComponent,
  },
  {
    path: 'shopping-add',
    providers: [provideEffects(ShoppingEffects, UnitEffects)],
    component: ShoppingAddComponent,
  },
  {
    path: 'shopping-add/:id',
    providers: [provideEffects(ShoppingEffects, UnitEffects)],
    component: ShoppingAddComponent,
  },
  {
    path: 'expired-products',
    providers: [provideEffects(ProductEffects, ReportEffects)],
    component: ExpiredProductsComponent,
  },
  {
    path: 'last-used',
    providers: [provideEffects(ReportEffects)],
    component: LastUsedComponent,
  },
  {
    path: 'product-prediction',
    providers: [provideEffects(ProductEffects, ReportEffects)],
    component: ProductPredictionComponent,
  },
  {
    path: 'availability',
    providers: [provideEffects(ProductEffects, ReportEffects)],
    component: AvailabilityComponent,
  },
  {
    path: 'next-expired',
    providers: [provideEffects(ReportEffects)],
    component: NextDaysExpiredComponent,
  },
  {
    path: 'sum-storage',
    providers: [
      provideEffects(ProductEffects, CategoryEffects, StorageEffects),
    ],
    component: SumStorageComponent,
  },
  {
    path: 'value-history',
    providers: [provideEffects(ReportEffects)],
    component: ValueHistoryComponent,
  },
  {
    path: 'price-history',
    providers: [provideEffects(ProductEffects, ReportEffects)],
    component: PriceHistoryComponent,
  },
  {
    path: 'sum-categories',
    providers: [provideEffects(ReportEffects)],
    component: SumCategoriesComponent,
  },
  {
    path: 'user-properties',
    providers: [provideEffects(PropertyEffects)],
    component: UserPropertiesComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
