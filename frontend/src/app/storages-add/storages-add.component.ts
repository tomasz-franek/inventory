import { Component, inject, OnInit } from '@angular/core';
import {
  Category,
  Inventory,
  Product,
  ProductPrice,
  Property,
  Storage,
  Unit,
} from '../api';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AsyncPipe,
  CommonModule,
  formatDate,
  NgForOf,
  NgIf,
} from '@angular/common';
import {
  BsDatepickerDirective,
  BsDatepickerModule,
} from 'ngx-bootstrap/datepicker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import {
  selectStorageEdit,
  StorageState,
} from '../state/storage/storage.selectors';
import {
  navigateToStorageList,
  saveStorage,
  setStorageInventoryId,
  setStorageProductId,
  setStorageUnitId,
} from '../state/storage/storage.action';
import {
  filterProductByCategory,
  getProductsList,
  productPriceSelector,
  ProductState,
} from '../state/product/product.selectors';
import {
  CategoryState,
  filterCategories,
} from '../state/category/category.selectors';
import {
  loadProductPriceAction,
  retrieveProductList,
  setProductCategoryId,
} from '../state/product/product.action';
import { retrieveCategoryList } from '../state/category/category.action';
import { Observable } from 'rxjs';
import { getUnitsList, UnitState } from '../state/unit/unit.selectors';
import { retrieveUnitList } from '../state/unit/unit.action';
import {
  getInventoriesList,
  InventoryState,
} from '../state/inventory/inventory.selectors';
import { retrieveInventoryList } from '../state/inventory/inventory.action';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-storages-add',
  imports: [
    CommonModule,
    BsDatepickerModule,
    TranslatePipe,
    NgForOf,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    BsDatepickerDirective,
    TranslatePipe,
  ],
  providers: [provideAnimations()],
  templateUrl: './storages-add.component.html',
  styleUrl: './storages-add.component.css',
})
export class StoragesAddComponent implements OnInit {
  private _storeProduct$: Store<ProductState> = inject(Store);
  private _storeCategory$: Store<CategoryState> = inject(Store);
  private _storeStorage$: Store<StorageState> = inject(Store);
  private _storeUnit$: Store<UnitState> = inject(Store);
  private _storeInventory$: Store<InventoryState> = inject(Store);
  protected products$!: Observable<Product[]>;
  protected categories$!: Observable<Category[]>;
  public inventories$!: Observable<Inventory[]>;
  public units$!: Observable<Unit[]>;
  public idCategory: number = 0;
  public productPrice$: ProductPrice = {
    averagePrice: 0,
    idProduct: 0,
    lastPrice: 0,
    maxPrice: 0,
    minPrice: 0,
  };
  public today = new Date();
  public properties: Property = {
    currency: 'EUR',
    idProperty: 0,
    language: 'en',
    idUser: 0,
  };
  protected _formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      idStorage: new FormControl(0, []),
      idProduct: new FormControl(0, [Validators.required, Validators.min(1)]),
      idCategory: new FormControl(0, []),
      idUnit: new FormControl(null, []),
      buyDate: new FormControl(null, [Validators.required]),
      validDate: new FormControl(null, []),
      count: new FormControl(0, []),
      items: new FormControl('', [Validators.required, Validators.min(1)]),
      idInventory: new FormControl(0, []),
      price: new FormControl(0, []),
      unitsCheckbox: new FormControl(false, []),
    });
  }

  ngOnInit() {
    this._storeProduct$.dispatch(retrieveProductList());
    this._storeCategory$.dispatch(retrieveCategoryList());
    this._storeUnit$.dispatch(retrieveUnitList());
    this._storeInventory$.dispatch(retrieveInventoryList());
    this.products$ = this._storeProduct$.select(getProductsList);
    this.categories$ = this._storeCategory$.select(filterCategories);
    this.units$ = this._storeUnit$.select(getUnitsList);
    this.inventories$ = this._storeInventory$.select(getInventoriesList);
    this._storeStorage$.select(selectStorageEdit).subscribe((storageEdit) => {
      if (storageEdit?.idCategory != undefined && storageEdit?.idCategory > 0) {
        this._formGroup.patchValue({ idCategory: storageEdit.idCategory });
        this._formGroup.get('idCategory')?.disable();
      }
      let idCategory: number =
        storageEdit != undefined && storageEdit.idCategory != undefined
          ? storageEdit.idCategory
          : 0;
      this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
      this.products$ = this._storeProduct$.select(filterProductByCategory);

      if (storageEdit?.idProduct != undefined && storageEdit?.idProduct > 0) {
        this._formGroup.patchValue({ idProduct: storageEdit.idProduct });
        this._formGroup.get('idProduct')?.disable();
      }
    });
    this.prepareProductPrice();
    this.updateCheckbox();
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  onBuyDateChange(): void {
    this._formGroup.markAllAsTouched();
  }

  changeCategory($event: any) {
    let idCategory: number = Number($event.target.value);
    this._formGroup.patchValue({ idCategory, idProduct: 0 });
    this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
    this.products$ = this._storeProduct$.select(filterProductByCategory);
  }

  changeProduct($event: any) {
    let idProduct: number = Number($event.target.value);
    this._formGroup.patchValue({ idProduct });
    this._storeProduct$.dispatch(setStorageProductId({ idProduct }));
    this._storeProduct$.dispatch(loadProductPriceAction({ id: idProduct }));
    this.prepareProductPrice();
  }

  prepareProductPrice() {
    this._storeProduct$
      .select(productPriceSelector)
      .subscribe((productPrice) => {
        if (productPrice) {
          this.productPrice$ = productPrice;
        } else {
          this.productPrice$ = {
            idProduct: 0,
            maxPrice: 0,
            minPrice: 0,
            lastPrice: 0,
            averagePrice: 0,
          };
        }
      });
  }

  onValidDateChanged($event: Date) {
    this._formGroup.patchValue({ validDate: $event });
  }

  updateCheckbox() {
    let checkbox: boolean =
      this._formGroup.get('unitsCheckbox')?.value || false;
    if (checkbox) {
      this._formGroup.get('count')?.enable();
      this._formGroup.get('idUnit')?.enable();
      this._formGroup
        .get('idUnit')
        ?.setValidators([Validators.required, Validators.min(1)]);
      this._formGroup
        .get('count')
        ?.setValidators([Validators.required, Validators.min(0.0001)]);
    } else {
      this._formGroup.get('count')?.disable();
      this._formGroup.get('idUnit')?.disable();
      this._storeProduct$.dispatch(setStorageUnitId({ idUnit: 0 }));
      this._formGroup.get('idUnit')?.setValidators(null);
      this._formGroup.get('count')?.setValidators(null);
      this._formGroup.patchValue({ idUnit: 0, count: '' });
    }
    this._formGroup.get('count')?.updateValueAndValidity();
    this._formGroup.get('idUnit')?.updateValueAndValidity();
  }

  setPrice(minPrice: number | undefined) {
    this._formGroup.patchValue({ price: minPrice });
  }

  close() {
    this._storeStorage$.dispatch(navigateToStorageList());
  }

  saveStorageActon(update: boolean) {
    let insertDate = formatDate(
      this._formGroup.get('buyDate')?.value,
      'yyyy-MM-dd',
      'en-US'
    );
    let validDate =
      this._formGroup.get('validDate')?.value !== undefined
        ? formatDate(
            this._formGroup.get('validDate')?.value,
            'yyyy-MM-dd',
            'en-US'
          )
        : undefined;
    const newStorage: Storage = {
      idProduct: this._formGroup.get('idProduct')?.value,
      insertDate: insertDate,
      validDate: validDate,
      items: this._formGroup.get('items')?.value,
      count: this._formGroup.get('count')?.value,
      idUnit: this._formGroup.get('idUnit')?.value,
      idInventory:
        this.formGroup.get('idInventory')?.value > 0
          ? this._formGroup.get('idInventory')?.value
          : undefined,
      optLock: 0,
      price: this._formGroup.get('price')?.value,
      used: 0,
    };
    this._storeStorage$.dispatch(saveStorage({ storage: newStorage }));
  }

  changeInventory($event: any) {
    let idInventory: number = Number($event.target.value);
    this._formGroup.patchValue({ idInventory });
    this._storeProduct$.dispatch(setStorageInventoryId({ idInventory }));
  }

  changeUnit($event: any) {
    let idUnit: number = Number($event.target.value);
    this._formGroup.patchValue({ idUnit });
    this._storeProduct$.dispatch(setStorageUnitId({ idUnit }));
  }
}
