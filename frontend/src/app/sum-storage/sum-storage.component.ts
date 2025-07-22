import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AsyncPipe, DecimalPipe, NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { Category, Product } from '../api';
import { Property } from '../api/model/property';
import { Observable } from 'rxjs';
import {
  CategoryState,
  filterCategories,
} from '../state/category/category.selectors';
import {
  filterProductByCategory,
  filterProducts,
  ProductState,
} from '../state/product/product.selectors';
import {
  filterStorages,
  StorageState,
} from '../state/storage/storage.selectors';
import { retrieveCategoryList } from '../state/category/category.action';
import {
  retrieveProductList,
  setProductCategoryId,
} from '../state/product/product.action';
import {
  retrieveStorageList,
  selectStorageByCategoryAndProduct,
  setHideUsed,
  setStorageCategoryId,
  setStorageProductId,
} from '../state/storage/storage.action';
import { ActiveColor } from '../utils/active-color';
import { InventoryStore } from '../../objects/store';

@Component({
  selector: 'app-sum-storage',
  imports: [
    FormsModule,
    TranslatePipe,
    ReactiveFormsModule,
    DecimalPipe,
    AsyncPipe,
    NgClass,
  ],
  templateUrl: './sum-storage.component.html',
  styleUrl: './sum-storage.component.css',
})
export class SumStorageComponent implements OnInit {
  public _storages$: InventoryStore[] = [];
  public _products$!: Observable<Product[]>;
  public _categories$!: Observable<Category[]>;
  private _storeCategory$: Store<CategoryState> = inject(Store);
  private _storeProduct$: Store<ProductState> = inject(Store);
  private _storeStorage$: Store<StorageState> = inject(Store);
  public property: Property = {
    idProperty: 0,
    currency: 'USD',
    idUser: 0,
    language: 'en',
  };
  private _formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      idCategory: new FormControl(0, []),
      idProduct: new FormControl(0, []),
    });
    this._storeStorage$.dispatch(setHideUsed({ hideUsed: true }));
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  async ngOnInit() {
    this._storeCategory$.dispatch(retrieveCategoryList());
    this._storeProduct$.dispatch(retrieveProductList());
    this._storeStorage$.dispatch(retrieveStorageList());
    this._products$ = this._storeProduct$.select(filterProducts);
    this._categories$ = this._storeCategory$.select(filterCategories);
    this.filterStorages();
  }

  filterStorages() {
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
    this._storeStorage$.select(filterStorages).subscribe((storages) => {
      this._storages$ = [];
      storages.forEach((storage) => {
        this._storages$.push({
          count: storage.count,
          endDate: storage.endDate,
          idInventory: 0,
          productName: storage.productName,
          idProduct: storage.idProduct,
          idStorage: storage.idStorage || 0,
          idUnit: storage.idUnit,
          insertDate: storage.insertDate,
          items: storage.items,
          name: '',
          totalPrice: Number((storage.items * (storage.price || 0)).toFixed(2)),
          usedPrice: Number(
            (
              storage.items *
              storage.used *
              0.01 *
              (storage.price || 0)
            ).toFixed(2)
          ),
          notUsedPrice:
            Number((storage.items * (storage.price || 0)).toFixed(2)) -
            Number(
              (
                storage.items *
                storage.used *
                0.01 *
                (storage.price || 0)
              ).toFixed(2)
            ),
          price: storage.price,
          used: storage.used,
          validDate: storage.validDate,
        });
      });
    });
  }

  updateCategory() {
    let idCategory = this._formGroup.get('idCategory')?.value;
    this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
    this._storeStorage$.dispatch(setStorageCategoryId({ idCategory }));
    this._products$ = this._storeProduct$.select(filterProductByCategory);
    this.filterStorages();
  }

  updateListProducts() {
    this._storeStorage$.dispatch(
      setStorageProductId({
        idProduct: this._formGroup.get('idProduct')?.value,
      })
    );
    if (this._formGroup.get('idCategory')?.value > 0) {
      this._storeStorage$.dispatch(
        setStorageCategoryId({
          idCategory: this._formGroup.get('idCategory')?.value,
        })
      );
    }
    this.filterStorages();
  }

  sum(column: string): number {
    if (this._storages$ == undefined) {
      return 0;
    } else {
      return this._storages$.reduce((sum: number, element: any) => {
        return sum + element[column];
      }, 0);
    }
  }

  protected readonly ActiveColor = ActiveColor;
}
