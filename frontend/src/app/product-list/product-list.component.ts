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
  filterProduct,
  filterProductByCategory,
  getProductsList,
  ProductState,
} from '../state/product/product.selectors';
import { TranslatePipe } from '@ngx-translate/core';
import {
  CategoryState,
  getCategoriesList,
  selectCategoryById,
} from '../state/category/category.selectors';
import { retrieveCategoryList } from '../state/category/category.action';
import { ActiveColor } from '../utils/active-color';

@Component({
  selector: 'app-product-list',
  imports: [NgForOf, AsyncPipe, TranslatePipe, NgClass],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  private _storeProduct$: Store<ProductState> = inject(Store);
  private _storeCategory$: Store<CategoryState> = inject(Store);
  protected products$!: Observable<Product[]>;
  protected categories$!: Observable<Category[]>;
  protected onlyActive: boolean = true;
  public filter: { categories: Category[]; idCategory: number } = {
    categories: [],
    idCategory: 0,
  };

  constructor() {}

  addNewProduct() {
    this._storeProduct$.dispatch(navigateToProductNew());
  }

  ngOnInit(): void {
    this._storeProduct$.dispatch(retrieveProductList());
    this.products$ = this._storeProduct$.select(getProductsList);
    this._storeCategory$.dispatch(retrieveCategoryList());
    this.categories$ = this._storeCategory$.select(getCategoriesList);
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
    this.onlyActive = $event.target.checked;
    this._storeProduct$.dispatch(setActiveProduct({ active: this.onlyActive }));
    this.products$ = this._storeProduct$.select(filterProduct);
  }

  categoryName(idCategory: number): Observable<Category | undefined> {
    return this._storeCategory$.select(selectCategoryById(idCategory));
  }

  protected readonly ActiveColor = ActiveColor;
}
