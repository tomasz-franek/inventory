import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category, Product, Property, Storage } from '../api';
import {
  getSelectedStoragesList,
  StorageState,
} from '../state/storage/storage.selectors';
import {
  filterProductByCategory,
  getProductsList,
  ProductState,
  selectProductById,
} from '../state/product/product.selectors';
import {
  CategoryState,
  getCategoriesList,
} from '../state/category/category.selectors';
import { FormsModule } from '@angular/forms';
import { StoragesFilter } from '../../objects/storagesFilter';
import { AsyncPipe, DecimalPipe, NgClass, NgForOf } from '@angular/common';
import {
  retrieveProductList,
  setProductCategoryId,
} from '../state/product/product.action';
import {
  navigateToStorageNew,
  retrieveStorageList,
  selectStorageByCategoryAndProduct,
  setHideUsed,
  setStorageCategoryId,
  setStorageEdit,
  setStorageProductId,
} from '../state/storage/storage.action';
import { retrieveCategoryList } from '../state/category/category.action';

@Component({
  selector: 'app-storages-list',
  imports: [
    TranslatePipe,
    FormsModule,
    NgClass,
    DecimalPipe,
    NgForOf,
    AsyncPipe,
  ],
  templateUrl: './storages-list.component.html',
  styleUrl: './storages-list.component.css',
})
export class StoragesListComponent implements OnInit {
  private _storeProduct$: Store<ProductState> = inject(Store);
  private _storeCategory$: Store<CategoryState> = inject(Store);
  private _storeStorage$: Store<StorageState> = inject(Store);
  protected storages$!: Observable<Storage[]>;
  protected products$!: Observable<Product[]>;
  protected categories$!: Observable<Category[]>;
  protected filter$: StoragesFilter = {
    idCategory: 0,
    idProduct: 0,
    allStorages: [],
    allProducts: [],
    hideUsed: false,
  };
  protected editStore$ = { idStorage: 0, price: 0, productName: '' };
  protected properties$!: Observable<Property>;

  constructor() {}

  ngOnInit() {
    this._storeStorage$.dispatch(setHideUsed({ hideUsed: true }));
    this._storeProduct$.dispatch(retrieveProductList());
    this._storeCategory$.dispatch(retrieveCategoryList());
    this._storeStorage$.dispatch(retrieveStorageList());
    this.storages$ = this._storeStorage$.select(getSelectedStoragesList);
    this.products$ = this._storeProduct$.select(getProductsList);
    this.categories$ = this._storeCategory$.select(getCategoriesList);
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
  }

  addNewStorage() {
    const storageEdit: Storage = {
      idProduct: this.filter$.idProduct,
      idCategory: this.filter$.idCategory,
      insertDate: '',
      items: 1,
      optLock: 0,
      price: 0,
      used: 0,
    };
    this._storeStorage$.dispatch(setStorageEdit({ storageEdit }));
    this._storeProduct$.dispatch(navigateToStorageNew());
  }

  activeTextColor(active: boolean) {
    if (!active) {
      return 'text-danger';
    } else {
      return 'text';
    }
  }

  updateFilterProduct(event: number) {
    let idProduct: number = Number(event);
    this.filter$.idProduct = idProduct;
    this._storeStorage$.dispatch(setStorageProductId({ idProduct }));
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
  }

  hideUsed(event: any) {
    let hideUsed = event.target.checked;
    this._storeStorage$.dispatch(setHideUsed({ hideUsed }));
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
  }

  updateFilterCategory(event: number) {
    let idCategory: number = Number(event);
    this._storeStorage$.dispatch(setStorageCategoryId({ idCategory }));
    this.filter$.idCategory = idCategory;
    this.filter$.idProduct = 0;
    this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
    this._storeStorage$.dispatch(setStorageProductId({ idProduct: 0 }));
    this.products$ = this._storeProduct$.select(filterProductByCategory);
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
  }

  editStorage(row: Storage) {
    // this.editStore.idStorage = row.idStorage;
    // this.editStore.price = row.price || 0;
    // this.editStore.productName = row.name || '';
  }

  updateStorage() {
    // if (this.editStore != null) {
    //
    //   this.dataService.updateStorage(this.editStore.idStorage, this.editStore.price)
    //     .subscribe({
    //       next: () => {
    //       },
    //       error: (error: HttpErrorResponse) => {
    //         this.alertService.error(error.statusText);
    //       },
    //       complete: () => {
    //         this.clearEditStore();
    //         this.completeProgress();
    //       }
    //     });
    // }
  }

  clearEditStore() {
    // this.editStore = {idStorage: 0, price: 0, productName: ''};
  }

  getProductName(idProduct: number): Observable<Product | undefined> {
    return this._storeProduct$.select(selectProductById(idProduct));
  }
}
