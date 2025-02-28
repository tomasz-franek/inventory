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
import { AsyncPipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
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
  private _storageForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._storageForm = this.formBuilder.group({
      idStorage: [0, []],
      idProduct: [0, [Validators.required, Validators.min(1)]],
      idCategory: [0, [Validators.required, Validators.min(1)]],
      idUnit: new FormControl({ value: 0, disabled: true }),
      buyDate: null,
      validDate: null,
      count: new FormControl({ value: 0, disabled: true }, Validators.required),
      items: [0, [Validators.required, Validators.min(1)]],
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
        this._storageForm.value.idCategory = storageEdit.idCategory;
        this._storageForm.get('idCategory')?.disable();
      }
      let idCategory: number =
        storageEdit != undefined && storageEdit.idCategory != undefined
          ? storageEdit.idCategory
          : 0;
      this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
      this.products$ = this._storeProduct$.select(filterProductByCategory);

      if (storageEdit?.idProduct != undefined && storageEdit?.idProduct > 0) {
        this._storageForm.value.idProduct = storageEdit.idProduct;
        this._storageForm.get('idProduct')?.disable();
      }
    });
  }

  get storageForm() {
    return this._storageForm;
  }

  changeCategory($event: any) {
    let idCategory: number = Number($event.target.value);
    this.storageForm.get('idCategory')?.setValue(idCategory);
    this.storageForm.get('idProduct')?.setValue(Number(0));
    this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
    this.products$ = this._storeProduct$.select(filterProductByCategory);
  }

  changeProduct($event: any) {
    let idProduct: number = Number($event.target.value);
    this._storageForm.value.idProduct = idProduct;
    this._storeProduct$.dispatch(setStorageProductId({ idProduct }));
    this.saveButtonDisabled = this.storageForm.invalid;
  }

  onChangeBuyDate($event: Date) {
    console.log(this._storageForm.value);
    this._storageForm.value.buyDate = $event;
    this.saveButtonDisabled = this.storageForm.valid;
    console.log(this.saveButtonDisabled);
  }

  onValidDateChanged($event: Date) {
    this._storageForm.value.validDate = $event;
    this.saveButtonDisabled = this.storageForm.invalid;
  }

  updateCheckbox($event: any) {
    let checkbox: boolean = $event.target.checked;
    if (checkbox) {
      this._storageForm.get('count')?.enable();
      this._storageForm.get('idUnit')?.enable();
    } else {
      this._storageForm.get('count')?.disable();
      this._storageForm.get('idUnit')?.disable();
      this._storeProduct$.dispatch(setStorageUnitId({ idUnit: 0 }));
    }
    this.saveButtonDisabled = this.storageForm.invalid;
  }

  setPrice(minPrice: number) {
    this._storageForm.value.price;
    this.saveButtonDisabled = this.storageForm.invalid;
  }

  close() {
    this._storeStorage$.dispatch(navigateToStorageList());
  }

  saveStorage(update: boolean) {
    const newStorage: Storage = {
      idProduct: 0,
      insertDate: this.storageForm.value.buyDate.toDateString(),
      validDate: this.storageForm.value.validDate?.toDateString(),
      items: this._storageForm.value.items,
      optLock: 0,
      price: this._storageForm.value.price,
      used: 0,
    };
    //this._storeStorage$.subscribe(saveStorage({ storage: newStorage }));
  }

  changeInventory($event: any) {
    let idInventory: number = Number($event.target.value);
    this._storageForm.value.idInventory = idInventory;
    this._storeProduct$.dispatch(setStorageInventoryId({ idInventory }));
  }

  changeUnit($event: any) {
    let idUnit: number = Number($event.target.value);
    this._storageForm.value.idUnit = idUnit;
    this._storeProduct$.dispatch(setStorageUnitId({ idUnit }));
  }
}
