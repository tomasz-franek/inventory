import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  Category,
  Inventory,
  Product,
  Property,
  Shopping,
  Unit,
  UnitDefault,
} from '../api';
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
import { StorageSave } from '../../objects/storageSave';
import {
  BsDatepickerConfig,
  BsDatepickerDirective,
} from 'ngx-bootstrap/datepicker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import {
  selectStorageEdit,
  StorageState,
} from '../state/storage/storage.selectors';
import {
  navigateToStorageList,
  selectStorageByCategoryAndProduct,
  setStorageCategoryId,
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
  retrievedProductList,
  setProductCategoryId,
} from '../state/product/product.action';
import { retrievedCategoryList } from '../state/category/category.action';
import { Observable } from 'rxjs';
import { getUnitsList, UnitState } from '../state/unit/unit.selectors';
import { retrieveUnitList } from '../state/unit/unit.action';
import {
  getInventoriesList,
  InventoryState,
} from '../state/inventory/inventory.selectors';
import { retrievedInventoryList } from '../state/inventory/inventory.action';

@Component({
  selector: 'app-storages-add',
  imports: [
    TranslatePipe,
    FormsModule,
    DecimalPipe,
    NgForOf,
    BsDatepickerDirective,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
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
  public storageSave: StorageSave = new StorageSave();
  public idCategory: number = 0;
  public productPrices: Price = new Price();
  public unitDefault: UnitDefault = {
    idProduct: 0,
    optLock: 0,
  };
  public unitsCheckbox: boolean = false;
  public shoppingList: Shopping[] = [];
  public properties: Property = {
    currency: '',
    idProperty: 0,
    language: '',
    idUser: 0,
  };
  public saveButtonDisabled: boolean = true;
  public validEndDate: boolean = false;
  public validDate: Date | null = null;
  public insertDate: Date = new Date();
  public validDatePickerOptions: BsDatepickerConfig | undefined;
  public insertDatePickerOptions: BsDatepickerConfig | undefined;
  protected _storageForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._storeProduct$.dispatch(retrievedProductList());
    this._storeCategory$.dispatch(retrievedCategoryList());
    this._storeUnit$.dispatch(retrieveUnitList());
    this._storeInventory$.dispatch(retrievedInventoryList());
    this.products$ = this._storeProduct$.select(getProductsList);
    this.categories$ = this._storeCategory$.select(getCategoriesList);
    this.units$ = this._storeUnit$.select(getUnitsList);
    this.inventories$ = this._storeInventory$.select(getInventoriesList);
    this._storeStorage$.select(selectStorageEdit).subscribe((storageEdit) => {
      this._storageForm = this.formBuilder.group({
        idStorage: 0,
        idProduct: [storageEdit?.idProduct, Validators.required],
        idCategory: [storageEdit?.idCategory, Validators.required],
        idUnit: new FormControl({ value: 0, disabled: true }),
        insertDate: '',
        validDate: '',
        count: new FormControl(
          { value: 0, disabled: true },
          Validators.required
        ),
        items: 0,
        idInventory: new FormControl({ value: 0, disabled: false }),
        price: 0,
        unitsCheckbox: new FormControl({ value: false, disabled: false }),
      });
      if (storageEdit?.idCategory != undefined && storageEdit?.idCategory > 0) {
        this._storageForm.get('idCategory')?.disable();
      }
      let idCategory: number =
        storageEdit != undefined && storageEdit.idCategory != undefined
          ? storageEdit.idCategory
          : 0;
      this._storeStorage$.dispatch(setStorageCategoryId({ idCategory }));
      this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
      this.products$ = this._storeProduct$.select(filterProductByCategory);

      if (storageEdit?.idProduct != undefined && storageEdit?.idProduct > 0) {
        this._storageForm.get('idProduct')?.disable();
      }
      let idProduct: number =
        storageEdit != undefined ? storageEdit.idProduct : 0;
      this._storeStorage$.dispatch(setStorageProductId({ idProduct }));

      this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
    });
  }

  get storageForm() {
    return this._storageForm;
  }

  changeCategory($event: any) {
    let idCategory: number = Number($event.target.value);
    this._storageForm.value.idCategory = idCategory;
    this._storeProduct$.dispatch(setStorageCategoryId({ idCategory }));
    this._storeProduct$.dispatch(setStorageProductId({ idProduct: 0 }));
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
  }

  changeProduct($event: any) {
    let idProduct: number = Number($event.target.value);
    this._storageForm.value.idProduct = idProduct;
    this._storeProduct$.dispatch(setStorageProductId({ idProduct }));
    this._storeStorage$.dispatch(selectStorageByCategoryAndProduct());
  }

  onChangeInsertDate($event: any) {}

  onValidDateChanged($event: any) {}

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
  }

  setPrice(minPrice: number) {}

  close() {
    this._storeStorage$.dispatch(navigateToStorageList());
  }

  saveStorage(update: boolean) {}

  changeInventory($event: any) {
    let idInventory: number = Number($event.target.value);
    console.log(idInventory);
    this._storageForm.value.idInventory = idInventory;
    this._storeProduct$.dispatch(setStorageInventoryId({ idInventory }));
  }

  changeUnit($event: any) {
    let idUnit: number = Number($event.target.value);
    console.log(idUnit);
    this._storageForm.value.idUnit = idUnit;
    this._storeProduct$.dispatch(setStorageUnitId({ idUnit }));
  }
}
