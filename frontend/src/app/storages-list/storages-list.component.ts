import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category, Product, Storage } from '../api';
import {
  filterStorages,
  getSelectedStoragesList,
  StorageState,
} from '../state/storage/storage.selectors';
import {
  filterProductByCategory,
  filterProducts,
  ProductState,
  selectProductById,
} from '../state/product/product.selectors';
import {
  CategoryState,
  filterCategories,
} from '../state/category/category.selectors';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AsyncPipe, DecimalPipe, NgClass } from '@angular/common';
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
      idProduct: new FormControl(0, [Validators.required, Validators.min(1)]),
      idCategory: new FormControl(0, []),
      hideUsed: new FormControl(true, []),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      idStorage: new FormControl(0, [Validators.required, Validators.min(1)]),
      productName: new FormControl('', []),
      storage: new FormControl(undefined, []),
    });
    this._formGroup.setValidators(this.updatedPriceValidator());
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  ngOnInit() {
    this._storeStorage$.dispatch(setHideUsed({ hideUsed: true }));
    this._storeProduct$.dispatch(retrieveProductList());
    this._storeCategory$.dispatch(retrieveCategoryList());
    this._storeStorage$.dispatch(retrieveStorageList());
    this.storages$ = this._storeStorage$.select(filterStorages);
    this.products$ = this._storeProduct$.select(filterProducts);
    this.categories$ = this._storeCategory$.select(filterCategories);
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

  updateFilterProduct() {
    let idProduct: number = this._formGroup.get('idProduct')?.value;
    this._formGroup.patchValue({ idProduct });
    this._storeStorage$.dispatch(setStorageProductId({ idProduct }));
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
    this.storages$ = this._storeStorage$.select(filterStorages);
  }

  hideUsed() {
    let hideUsed = this._formGroup.get('hideUsed')?.value;
    this._storeStorage$.dispatch(setHideUsed({ hideUsed }));
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
    this.storages$ = this._storeStorage$.select(filterStorages);
  }

  updateFilterCategory() {
    let idCategory: number = this._formGroup.get('idCategory')?.value;
    this._storeStorage$.dispatch(setStorageCategoryId({ idCategory }));
    this._formGroup.patchValue({ idProduct: 0 });
    this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
    this._storeStorage$.dispatch(setStorageProductId({ idProduct: 0 }));
    this.products$ = this._storeProduct$.select(filterProductByCategory);
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
    this.storages$ = this._storeStorage$.select(getSelectedStoragesList);
  }

  editStorage(storage: Storage) {
    this._storeProduct$
      .select(selectProductById(storage.idProduct))
      .subscribe((product) => {
        if (product != undefined) {
          this._formGroup.patchValue({
            productName: product.name,
            idProduct: storage.idProduct,
            idStorage: storage.idStorage,
            price: storage.price,
            idCategory: storage.idCategory,
            storage: storage,
          });
        }
      });
  }

  updateStorage() {
    let updatedStorage = {
      ...this._formGroup.get('storage')?.value,
      price: this._formGroup.get('price')?.value,
    };
    this._storeStorage$.dispatch(saveStorage({ storage: updatedStorage }));
    this._storeStorage$.dispatch(retrieveStorageList());
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
    this.clearEditStore();
  }

  clearEditStore() {
    this._formGroup.patchValue({
      idStorage: 0,
      price: 0,
      productName: '',
      idProduct: 0,
      idCategory: 0,
    });
  }

  getProductName(idProduct: number): Observable<Product | undefined> {
    return this._storeProduct$.select(selectProductById(idProduct));
  }

  protected readonly ActiveColor = ActiveColor;

  updatePrice($event: any) {
    let newPrice = Number($event.target.value);
    this._formGroup.patchValue({ price: newPrice });
  }

  public updatedPriceValidator(): ValidatorFn {
    return (): ValidationErrors | null => {
      const idProduct = this._formGroup.get('idProduct')?.value;
      const idStorage = this._formGroup.get('idStorage')?.value;
      const price = this._formGroup.get('price')?.value;
      if (price <= 0.0) {
        return { valid: false };
      }
      if (idStorage <= 0) {
        return { valid: false };
      }
      if (idProduct <= 0) {
        return { valid: false };
      }
      return null;
    };
  }
}
