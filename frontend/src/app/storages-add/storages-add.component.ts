import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Category, Inventory, Product, Property, Storage, Unit } from '../api';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AsyncPipe,
  DatePipe,
  DecimalPipe,
  formatDate,
  NgForOf,
  NgIf,
} from '@angular/common';
import { Price } from '../../objects/price';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
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
  ProductState,
} from '../state/product/product.selectors';
import {
  CategoryState,
  getCategoriesList,
} from '../state/category/category.selectors';
import {
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

@Component({
  selector: 'app-storages-add',
  imports: [
    TranslatePipe,
    FormsModule,
    DecimalPipe,
    NgForOf,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    BsDatepickerDirective,
    DatePipe,
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
  public productPrices: Price = new Price();
  public today = new Date();
  public properties: Property = {
    currency: '',
    idProperty: 0,
    language: '',
    idUser: 0,
  };
  public saveButtonDisabled: boolean = true;
  private _formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      idStorage: [0, []],
      idProduct: [0, [Validators.required, Validators.min(1)]],
      idCategory: [0, [Validators.required, Validators.min(1)]],
      idUnit: new FormControl({ value: 0, disabled: true }),
      buyDate: [null, Validators.required],
      validDate: null,
      count: new FormControl({ value: 0, disabled: true }, Validators.required),
      items: [0, [Validators.min(1), Validators.required]],
      idInventory: 0,
      price: 0,
      unitsCheckbox: new FormControl({ value: false, disabled: false }),
    });
  }

  ngOnInit(): void {
    this._storeProduct$.dispatch(retrieveProductList());
    this._storeCategory$.dispatch(retrieveCategoryList());
    this._storeUnit$.dispatch(retrieveUnitList());
    this._storeInventory$.dispatch(retrieveInventoryList());
    this.products$ = this._storeProduct$.select(getProductsList);
    this.categories$ = this._storeCategory$.select(getCategoriesList);
    this.units$ = this._storeUnit$.select(getUnitsList);
    this.inventories$ = this._storeInventory$.select(getInventoriesList);
    this._storeStorage$.select(selectStorageEdit).subscribe((storageEdit) => {
      if (storageEdit?.idCategory != undefined && storageEdit?.idCategory > 0) {
        this._formGroup.value.idCategory = storageEdit.idCategory;
        this._formGroup.get('idCategory')?.disable();
      }
      let idCategory: number =
        storageEdit != undefined && storageEdit.idCategory != undefined
          ? storageEdit.idCategory
          : 0;
      this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
      this.products$ = this._storeProduct$.select(filterProductByCategory);

      if (storageEdit?.idProduct != undefined && storageEdit?.idProduct > 0) {
        this._formGroup.value.idProduct = storageEdit.idProduct;
        this._formGroup.get('idProduct')?.disable();
      }
    });
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  changeCategory($event: any) {
    let idCategory: number = Number($event.target.value);
    this._formGroup.get('idCategory')?.setValue(idCategory);
    this._formGroup.get('idProduct')?.setValue(Number(0));
    this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
    this.products$ = this._storeProduct$.select(filterProductByCategory);
  }

  changeProduct($event: any) {
    let idProduct: number = Number($event.target.value);
    this._formGroup.value.idProduct = idProduct;
    this._storeProduct$.dispatch(setStorageProductId({ idProduct }));
    this.saveButtonDisabled = this._formGroup.valid;
  }

  onChangeBuyDate($event: Date) {
    this._formGroup.value.buyDate = $event;
    this.saveButtonDisabled = this._formGroup.valid;
  }

  onValidDateChanged($event: Date) {
    this._formGroup.value.validDate = $event;
    this.saveButtonDisabled = this._formGroup.valid;
  }

  updateCheckbox($event: any) {
    let checkbox: boolean = $event.target.checked;
    if (checkbox) {
      this._formGroup.get('count')?.enable();
      this._formGroup.get('idUnit')?.enable();
    } else {
      this._formGroup.get('count')?.disable();
      this._formGroup.get('idUnit')?.disable();
      this._storeProduct$.dispatch(setStorageUnitId({ idUnit: 0 }));
    }
    this.saveButtonDisabled = this._formGroup.invalid;
  }

  setPrice(minPrice: number) {
    this._formGroup.value.price;
    this.saveButtonDisabled = this._formGroup.invalid;
  }

  close() {
    this._storeStorage$.dispatch(navigateToStorageList());
  }

  saveStorageActon(update: boolean) {
    let insertDate = formatDate(
      this._formGroup.value.buyDate,
      'yyyy-MM-dd',
      'en-US'
    );
    let validDate =
      this._formGroup.value.validDate !== null
        ? formatDate(this._formGroup.value.validDate, 'yyyy-MM-dd', 'en-US')
        : undefined;
    const newStorage: Storage = {
      idProduct: this._formGroup.value.idProduct,
      insertDate: insertDate,
      validDate: validDate,
      items: this._formGroup.value.items,
      count: this._formGroup.value.count,
      idUnit: this._formGroup.value.idUnit,
      optLock: 0,
      price: this._formGroup.value.price,
      used: 0,
    };
    this._storeStorage$.dispatch(saveStorage({ storage: newStorage }));
  }

  changeInventory($event: any) {
    let idInventory: number = Number($event.target.value);
    this._formGroup.value.idInventory = idInventory;
    this._storeProduct$.dispatch(setStorageInventoryId({ idInventory }));
  }

  changeUnit($event: any) {
    let idUnit: number = Number($event.target.value);
    this._formGroup.value.idUnit = idUnit;
    this._storeProduct$.dispatch(setStorageUnitId({ idUnit }));
  }

  changeItems($event: any) {
    let items: number = Number($event.target.value);
    this._formGroup.value.items = items;
  }
}
