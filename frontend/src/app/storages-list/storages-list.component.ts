import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category, Product, Storage } from '../api';
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
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, DecimalPipe, NgClass, NgForOf } from '@angular/common';
import {
  retrieveProductList,
  setProductCategoryId,
} from '../state/product/product.action';
import {
  navigateToStorageNew,
  retrieveStorageList,
  saveStorage,
  selectStorageByCategoryAndProduct,
  setHideUsed,
  setStorageCategoryId,
  setStorageEdit,
  setStorageProductId,
} from '../state/storage/storage.action';
import { retrieveCategoryList } from '../state/category/category.action';
import { ActiveColor } from '../utils/active-color';

@Component({
  selector: 'app-storages-list',
  imports: [
    TranslatePipe,
    FormsModule,
    NgClass,
    DecimalPipe,
    NgForOf,
    AsyncPipe,
    ReactiveFormsModule,
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

  private _formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      idProduct: [0, [Validators.required, Validators.min(1)]],
      idCategory: [0, [Validators.required, Validators.min(1)]],
      hideUsed: false,
      newPrice: undefined,
      storage: undefined,
    });
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

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
      idProduct: 0,
      idCategory: 0,
      insertDate: '',
      items: 1,
      optLock: 0,
      price: 0,
      used: 0,
    };
    this._storeStorage$.dispatch(setStorageEdit({ storageEdit }));
    this._storeProduct$.dispatch(navigateToStorageNew());
  }

  updateFilterProduct(event: number) {
    let idProduct: number = Number(event);
    this._formGroup.value.idProduct = idProduct;
    this._storeStorage$.dispatch(setStorageProductId({ idProduct }));
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
  }

  hideUsed(event: any) {
    let hideUsed = event.target.checked;
    this._storeStorage$.dispatch(setHideUsed({ hideUsed }));
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
  }

  updateFilterCategory() {
    let idCategory: number = this._formGroup.value.idCategory;
    this._storeStorage$.dispatch(setStorageCategoryId({ idCategory }));
    this._formGroup.value.idProduct = 0;
    this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
    this._storeStorage$.dispatch(setStorageProductId({ idProduct: 0 }));
    this.products$ = this._storeProduct$.select(filterProductByCategory);
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
  }

  editStorage(storage: Storage) {
    this._formGroup.value.storage = storage;
    this._formGroup.value.editStore = {
      idStorage: storage.idStorage,
      price: storage.price,
      productName: document.getElementById('productName')?.innerText,
    };
  }

  updateStorage() {
    debugger;
    let updatedStorage = {
      ...this._formGroup.value.storage,
      price: this._formGroup.value.newPrice,
    };
    this._storeStorage$.dispatch(saveStorage({ storage: updatedStorage }));
    this._storeStorage$.dispatch(retrieveStorageList());
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
  }

  clearEditStore() {
    this._formGroup.value.idStorage = 0;
    this._formGroup.value.price = 0;
    this._formGroup.value.productName = '';
  }

  getProductName(idProduct: number): Observable<Product | undefined> {
    return this._storeProduct$.select(selectProductById(idProduct));
  }

  protected readonly ActiveColor = ActiveColor;

  updatePrice($event: any) {
    let newPrice = Number($event.target.value);
    this._formGroup.value.newPrice = newPrice;
  }
}
