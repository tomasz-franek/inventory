import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AsyncPipe, DecimalPipe, NgClass, NgForOf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Category, Product } from '../api';
import { Properties } from '../api/model/properties';
import { Observable } from 'rxjs';
import {
  CategoryState,
  getCategoriesList,
} from '../state/category/category.selectors';
import {
  filterProductByCategory,
  getProductsList,
  ProductState,
} from '../state/product/product.selectors';
import {
  getSelectedStoragesList,
  StorageState,
} from '../state/storage/storage.selectors';
import { retrieveCategoryList } from '../state/category/category.action';
import {
  retrieveProductList,
  setProductCategoryId,
} from '../state/product/product.action';
import { InventoryStore } from '../../objects/store';
import {
  retrieveStorageList,
  selectStorageByCategoryAndProduct,
  setStorageCategoryId,
  setStorageProductId,
} from '../state/storage/storage.action';

@Component({
  selector: 'app-sum-storage',
  imports: [
    FormsModule,
    TranslatePipe,
    ReactiveFormsModule,
    NgForOf,
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
  private _storeProducts$: Store<ProductState> = inject(Store);
  private _storeStorage$: Store<StorageState> = inject(Store);
  public properties: Properties = {
    currency: 'USD',
    idUser: 0,
    language: 'en',
  };
  private _formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      idCategory: 0,
      idProduct: 0,
      allProducts: [],
      allStorages: [],
      hideUsed: true,
    });
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  async ngOnInit() {
    this._storeCategory$.dispatch(retrieveCategoryList());
    this._storeProducts$.dispatch(retrieveProductList());
    this._storeStorage$.dispatch(retrieveStorageList());
    this._products$ = this._storeProducts$.select(getProductsList);
    this._categories$ = this._storeCategory$.select(getCategoriesList);
    this.filterStorages();
    // await zip(
    //   this.dataService.readProducts(),
    //   this.dataService.readCategories(),
    //   this.dataService.readStorages()
    // ).subscribe({
    //   next: (data) => {
    //     if (data[0].length > 0) {
    //       this.filter.allProducts = data[0];
    //       this.products = data[0];
    //       this.categories = data[1];
    //     }
    //     if (data[2]) {
    //       this.filter.allStorages = data[2].filter((el: Store) => {
    //         return el.endDate === undefined;
    //       });
    //       this.filter.allStorages.forEach((item: Store) => {
    //         item.totalPrice = Number(
    //           (item.items * (item.price || 0)).toFixed(2)
    //         );
    //         item.usedPrice = Number(
    //           (item.items * item.used * 0.01 * (item.price || 0)).toFixed(2)
    //         );
    //         item.notUsedPrice = item.totalPrice - item.usedPrice;
    //       });
    //     } else {
    //       this.filter.allStorages = [];
    //     }
    //     this.setProductNames();
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     this.alertService.error(error.statusText);
    //   },
    //   complete: () => {
    //     this.completeProgress();
    //   },
    // });
  }

  showStorages() {
    /*
    transform(filter: StoragesFilter): Store[] {
      if (!filter) {
        return [];
      }
      if (!filter.allStorages) {
        return filter.allStorages;
      }

      let response = filter.allStorages.filter(row => {
        if (filter.hideUsed && row.used >= 100) {
          return false;
        }
        if (filter.idCategory == 0) {
          return true;
        }
        if (filter.idProduct != 0) {
          if (filter.idProduct == row.idProduct) {
            return true;
          }
        } else {
          let filteredByCategory: Product[] = filter.allProducts.filter(el => {
            return filter.idCategory == el.idCategory;
          });
          if (filteredByCategory.length > 0) {
            return filteredByCategory.filter(el2 => {
              return el2.idProduct == row.idProduct;
            }).length > 0;
          }
        }
        return false;
      });
      return response;
    }

    setProductNames(filter: StoragesFilter): void {
      if (filter.allStorages.length > 0 && filter.allProducts.length > 0) {
      filter.allStorages.forEach(row => {
        row.name = this.getProductName(filter, row.idProduct);
      });
    }


  }

    getProductName(filter: StoragesFilter, idProduct: number): string {
      let product = filter.allProducts.find(el => {
        return el.idProduct == idProduct;
      });
      if (product) {
        return product.name;
      } else {
        return '<none>';
      }
    }     */
  }

  setProductNames() {
    // new StoragesPipe().setProductNames(this.filter);
    // this.storages = this.filter.allStorages;
  }

  filterStorages() {
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
    this._storeStorage$
      .select(getSelectedStoragesList)
      .subscribe((storages) => {
        this._storages$ = [];
        storages.forEach((storage) => {
          this._storages$.push({
            count: storage.count,
            endDate: storage.endDate,
            idInventory: 0,
            idProduct: storage.idProduct,
            idStorage: storage.idStorage || 0,
            idUnit: storage.idUnit,
            insertDate: storage.insertDate,
            items: storage.items,
            name: '',
            totalPrice: Number(
              (storage.items * (storage.price || 0)).toFixed(2)
            ),
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
    this._storeProducts$.dispatch(
      setProductCategoryId({ idCategory: this._formGroup.value.idCategory })
    );
    this._products$ = this._storeProducts$.select(filterProductByCategory);
    this.filterStorages();
  }

  updateListProducts() {
    this._storeStorage$.dispatch(
      setStorageProductId({ idProduct: this._formGroup.value.idProduct })
    );
    if (this._formGroup.value.idCategory > 0) {
      this._storeStorage$.dispatch(
        setStorageCategoryId({ idCategory: this._formGroup.value.idCategory })
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

  fullUsedColor(used: number): string {
    if (used >= 100) {
      return 'text-danger';
    } else {
      return 'text';
    }
  }
}
