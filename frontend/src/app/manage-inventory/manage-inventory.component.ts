import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Category, Product, ProductValid, StorageReportDataRow } from '../api';
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
  getSelectedValidInventory,
  getValidInventory,
  ReportState,
} from '../state/report/report.selectors';
import {
  retrieveValidInventoryData,
  selectValidInventoryByCategoryAndProduct,
  setReportCategoryId,
  setReportProductId,
} from '../state/report/report.action';

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
  public _inventory$!: Observable<StorageReportDataRow[]>;
  protected _storeCategory$: Store<CategoryState> = inject(Store);
  private _storeProduct$: Store<ProductState> = inject(Store);
  private _storeReport$: Store<ReportState> = inject(Store);
  public _products$!: Observable<Product[]>;
  public _categories$!: Observable<Category[]>;
  private readonly _manageInventory: FormGroup;

  get manageInventory(): FormGroup {
    return this._manageInventory;
  }

  constructor(private formBuilder: FormBuilder) {
    this._manageInventory = this.formBuilder.group({
      idInventory: [0, Validators.required],
      idCategory: 0,
      idProduct: [0, Validators.required],
    });
  }

  countItems(validList: ProductValid[]): number {
    let sum = 0;
    validList.forEach((e) => {
      sum += e.count;
    });
    return sum;
  }

  ngOnInit(): void {
    this._storeProduct$.dispatch(retrieveProductList());
    this._products$ = this._storeProduct$.select(getProductsList);
    this._storeCategory$.dispatch(retrieveCategoryList());
    this._categories$ = this._storeCategory$.select(getCategoriesList);
    this._storeReport$.dispatch(retrieveValidInventoryData());
    this._inventory$ = this._storeReport$.select(getValidInventory);
  }

  updateFilterProduct(event: any) {
    let idProduct: number = Number(event.target.value);
    this._manageInventory.value.idProduct = idProduct;
    this._storeReport$.dispatch(setReportProductId({ idProduct }));
    this._storeReport$.dispatch(selectValidInventoryByCategoryAndProduct());
  }

  updateFilterCategory(event: any) {
    let idCategory: number = Number(event.target.value);
    this._manageInventory.value.idCategory = idCategory;
    this._manageInventory.value.idProduct = 0;
    this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
    this._products$ = this._storeProduct$.select(filterProductByCategory);
    this._storeReport$.dispatch(setReportCategoryId({ idCategory }));
    this._storeReport$.dispatch(selectValidInventoryByCategoryAndProduct());
    this._inventory$ = this._storeReport$.select(getSelectedValidInventory);
  }
}
