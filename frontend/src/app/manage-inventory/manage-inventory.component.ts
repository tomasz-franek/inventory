import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Category, Product } from '../api';
import { ValidInventory } from '../../objects/validInventory';
import { DownloadFileComponent } from '../download-file/download-file.component';
import { Observable } from 'rxjs';
import {
  retrieveProductList,
  setProductCategoryId,
} from '../state/product/product.action';
import {
  filterProductByCategory,
  getProductsList,
  ProductState,
} from '../state/product/product.selectors';
import { retrieveCategoryList } from '../state/category/category.action';
import {
  CategoryState,
  getCategoriesList,
} from '../state/category/category.selectors';
import { Store } from '@ngrx/store';
import {
  selectStorageByCategoryAndProduct,
  setStorageCategoryId,
  setStorageProductId,
} from '../state/storage/storage.action';
import { InventoryState } from '../state/inventory/inventory.selectors';

@Component({
  selector: 'app-manage-inventory',
  imports: [
    TranslatePipe,
    FormsModule,
    NgForOf,
    NgIf,
    DownloadFileComponent,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './manage-inventory.component.html',
  styleUrl: './manage-inventory.component.css',
})
export class ManageInventoryComponent implements OnInit {
  public inventory: any = [];
  protected _storeCategory$: Store<CategoryState> = inject(Store);
  private _storeProduct$: Store<ProductState> = inject(Store);
  private _storeInventory$: Store<InventoryState> = inject(Store);
  public _products$!: Observable<Product[]>;
  public _categories$!: Observable<Category[]>;
  private allProducts: Product[] = [];
  private allInventory: ValidInventory[] = [];
  private progress: number = 0;
  private readonly _manageInventory: FormGroup;

  get manageInventory(): FormGroup {
    return this._manageInventory;
  }

  constructor(private formBuilder: FormBuilder) {
    this._manageInventory = this.formBuilder.group({
      idInventory: [0, Validators.required],
      idCategory: new FormControl(),
      idProduct: [0, Validators.required],
    });
  }

  countItems(validList: any): string {
    return '';
  }

  ngOnInit(): void {
    this._storeProduct$.dispatch(retrieveProductList());
    this._products$ = this._storeProduct$.select(getProductsList);
    this._storeCategory$.dispatch(retrieveCategoryList());
    this._categories$ = this._storeCategory$.select(getCategoriesList);
  }

  updateFilterProduct(event: any) {
    let idProduct: number = Number(event.target.value);
    this._manageInventory.value.idProduct = idProduct;
    this._storeInventory$.dispatch(setStorageProductId({ idProduct }));
    this._storeInventory$.dispatch(selectStorageByCategoryAndProduct());
  }

  updateFilterCategory(event: any) {
    let idCategory: number = Number(event.target.value);
    this._storeInventory$.dispatch(setStorageCategoryId({ idCategory }));
    this._manageInventory.value.idCategory = idCategory;
    this._manageInventory.value.idProduct = 0;
    this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
    this._storeInventory$.dispatch(setStorageProductId({ idProduct: 0 }));
    this._products$ = this._storeProduct$.select(filterProductByCategory);
    this._storeInventory$.dispatch(selectStorageByCategoryAndProduct());
  }
}
