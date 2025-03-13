import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf } from '@angular/common';
import { Category, Product } from '../api';
import { Store } from '@ngrx/store';
import {
  navigateToProductEdit,
  navigateToProductNew,
  retrieveProductList,
  setActiveProduct,
  setProductCategoryId,
} from '../state/product/product.action';
import { Observable } from 'rxjs';
import {
  filterProducts,
  filterProductByCategory,
  getProductsList,
  ProductState,
} from '../state/product/product.selectors';
import { TranslatePipe } from '@ngx-translate/core';
import {
  CategoryState,
  getCategoriesList,
  selectCategoryById,
  filterCategories
} from '../state/category/category.selectors';
import { retrieveCategoryList } from '../state/category/category.action';
import { ActiveColor } from '../utils/active-color';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [NgForOf, AsyncPipe, TranslatePipe, NgClass, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  private _storeProduct$: Store<ProductState> = inject(Store);
  private _storeCategory$: Store<CategoryState> = inject(Store);
  protected products$!: Observable<Product[]>;
  protected categories$!: Observable<Category[]>;
  private _formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this._formGroup = this.formBuilder.group({
      categories: [],
      idCategory: 0,
      onlyActive: true,
    });
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  addNewProduct() {
    this._storeProduct$.dispatch(navigateToProductNew());
  }

  ngOnInit(): void {
    this._storeProduct$.dispatch(retrieveProductList());
    this._storeProduct$.dispatch(
      setActiveProduct({ active: this._formGroup.value.onlyActive })
    );
    this.products$ = this._storeProduct$.select(filterProduct);
    this._storeCategory$.dispatch(retrieveCategoryList());
    this.categories$ = this._storeCategory$.select(filterCategories);
  }

  updateProduct(product: Product) {
    this._storeProduct$.dispatch(navigateToProductEdit({ product }));
  }

  filterCategories($event: any) {
    let idCategory: number = $event.target.value;

    this._storeProduct$.dispatch(setProductCategoryId({ idCategory }));
    this.products$ = this._storeProduct$.select(filterProductByCategory);
  }

  filterActive($event: any) {
    this._formGroup.patchValue({ onlyActive: $event.target.checked });
    this._storeProduct$.dispatch(
      setActiveProduct({ active: this._formGroup.value.onlyActive })
    );
    this.products$ = this._storeProduct$.select(filterProductByCategory);
  }

  categoryName(idCategory: number): Observable<Category | undefined> {
    return this._storeCategory$.select(selectCategoryById(idCategory));
  }

  protected readonly ActiveColor = ActiveColor;
}
