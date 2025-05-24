import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AsyncPipe, DecimalPipe, NgForOf, NgStyle } from '@angular/common';
import {
  Category,
  ConsumeProduct,
  Inventory,
  ItemConsume,
  Product,
  Property,
  Shopping,
} from '../api';
import {
  BsDatepickerDirective,
  BsDatepickerInputDirective,
} from 'ngx-bootstrap/datepicker';
import { Store } from '@ngrx/store';
import {
  filterInventories,
  InventoryState,
} from '../state/inventory/inventory.selectors';
import {
  CategoryState,
  filterCategories,
} from '../state/category/category.selectors';
import {
  filterProductByCategory,
  filterProducts,
  ProductState,
} from '../state/product/product.selectors';
import { Observable } from 'rxjs';
import { retrieveInventoryList } from '../state/inventory/inventory.action';
import { retrieveCategoryList } from '../state/category/category.action';
import {
  retrieveProductList,
  setProductCategoryId,
} from '../state/product/product.action';
import {
  consumeItem,
  retrieveConsumeProductListInventoryCategory,
  retrieveConsumeProductListInventoryCategoryProduct,
} from '../state/item/item.action';
import {
  ItemState,
  selectConsumeProductList,
} from '../state/item/item.selectors';
import { ShoppingState } from '../state/shopping/shopping.selectors';
import { saveShopping } from '../state/shopping/shopping.action';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-consume-product',
  imports: [
    FormsModule,
    TranslatePipe,
    DecimalPipe,
    NgForOf,
    NgStyle,
    BsDatepickerDirective,
    AsyncPipe,
    ReactiveFormsModule,
    BsDatepickerInputDirective,
  ],
  providers: [provideAnimations()],
  templateUrl: './consume-product.component.html',
  styleUrl: './consume-product.component.css',
})
export class ConsumeProductComponent implements OnInit {
  private _storeInventory$: Store<InventoryState> = inject(Store);
  private _storeCategory$: Store<CategoryState> = inject(Store);
  private _storeProduct$: Store<ProductState> = inject(Store);
  public _inventories$!: Observable<Inventory[]>;
  public _categories$!: Observable<Category[]>;
  public _products$!: Observable<Product[]>;
  private _storeItem$: Store<ItemState> = inject(Store);
  private _storeShopping$: Store<ShoppingState> = inject(Store);
  public _consumeProducts$!: Observable<ConsumeProduct[]>;
  public properties: Property = { idProperty: 0, idUser: 0, currency: '' };
  protected today: Date = new Date();
  private _formGroup: FormGroup;
  protected disabledButtonNext = true;
  protected disabledButtonPrevious = true;

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      idInventory: new FormControl(0, []),
      idCategory: new FormControl(0, []),
      idProduct: new FormControl(0, [Validators.required, Validators.min(1)]),
      idItem: new FormControl(0, []),
      sliderMin: new FormControl(0, []),
      used: new FormControl(0, [Validators.required, Validators.min(1)]),
      endDate: new FormControl('', []),
      productName: new FormControl('', []),
    });
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  ngOnInit(): void {
    this._storeInventory$.dispatch(retrieveInventoryList());
    this._storeCategory$.dispatch(retrieveCategoryList());
    this._storeCategory$.dispatch(retrieveProductList());
    this._products$ = this._storeProduct$.select(filterProducts);
    this._categories$ = this._storeCategory$.select(filterCategories);
    this._inventories$ = this._storeInventory$.select(filterInventories);
  }

  loadConsumeProductList(): void {
    if (
      this._formGroup.get('idCategory')?.value > 0 &&
      this._formGroup.get('idInventory')?.value > 0
    ) {
      if (this._formGroup.get('idProduct')?.value > 0) {
        this._storeItem$.dispatch(
          retrieveConsumeProductListInventoryCategoryProduct({
            idInventory: this._formGroup.get('idInventory')?.value,
            idCategory: this._formGroup.get('idCategory')?.value,
            idProduct: this._formGroup.get('idProduct')?.value,
          })
        );
      } else {
        this._storeItem$.dispatch(
          retrieveConsumeProductListInventoryCategory({
            idInventory: this._formGroup.get('idInventory')?.value,
            idCategory: this._formGroup.get('idCategory')?.value,
          })
        );
      }
      this._consumeProducts$ = this._storeItem$.select(
        selectConsumeProductList
      );
    }
  }

  consumeItem() {
    let itemToConsume: ItemConsume = {
      endDate: this._formGroup.get('endDate')?.value,
      idItem: this._formGroup.get('idItem')?.value,
      used: this._formGroup.get('used')?.value,
    };
    this._storeItem$.dispatch(consumeItem({ itemToConsume }));
  }

  onChangeEndDate(value: Date): void {
    this._formGroup.patchValue({ endDate: value });
  }

  addDay(number: number) {
    if (this._formGroup.get('endDate') != null) {
      let newDate: Date = new Date(this._formGroup.get('endDate')?.value);
      this.disabledButtonNext = newDate.getDate() > new Date().getDate() - 2;
      newDate.setDate(newDate.getDate() + number);
      this._formGroup.patchValue({ endDate: newDate });
    }
  }

  currentDate() {
    this._formGroup.patchValue({ endDate: new Date(), used: 100 });
    this.disabledButtonPrevious = false;
    this.disabledButtonNext = false;
  }

  updateFilterProducts($event: any) {
    this._formGroup.patchValue({ idProduct: Number($event.target.value) });
    this.loadConsumeProductList();
  }

  updateFilterInventory($event: any) {
    this._formGroup.patchValue({ idInventory: Number($event.target.value) });
    this.loadConsumeProductList();
  }

  updateFilterCategories($event: any) {
    let idCategory: number = Number($event.target.value);
    this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
    this._products$ = this._storeProduct$.select(filterProductByCategory);
    this.loadConsumeProductList();
  }

  expired(expiredDate?: string): string {
    if (expiredDate && expiredDate != '') {
      let date = new Date(expiredDate);
      if (date < new Date()) {
        return 'color:#F08080';
      }
    }
    return 'color:#000000';
  }

  selectProductToConsume(row: ConsumeProduct) {
    this._formGroup.patchValue({
      idItem: row.idItem,
      sliderMin: row.used,
      used: row.used,
      endDate: null,
      productName: row.productName,
      idProduct: row.idProduct,
    });
  }

  changeValueUsed() {
    if (this._formGroup.get('used')?.value == 100) {
      this._formGroup.get('endDate')?.setValidators([Validators.required]);
    } else {
      this._formGroup.get('endDate')?.setValidators(null);
      this._formGroup.patchValue({ endDate: null });
      this.disabledButtonNext = true;
      this.disabledButtonPrevious = true;
    }
    this._formGroup.get('endDate')?.updateValueAndValidity();
  }

  addToShopping(row: ConsumeProduct) {
    let shopping: Shopping = {
      idProduct: row.idProduct,
      name: row.productName,
      items: 1,
      count: 1,
      optLock: 0,
    };
    this._storeShopping$.dispatch(saveShopping({ shopping }));
  }

  getProductName(): string {
    return this._formGroup.get('productName')?.value || '';
  }
}
