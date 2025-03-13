import { createAction, props } from '@ngrx/store';
import { Product, ProductPrice } from '../../api';
import { HttpErrorResponse } from '@angular/common/http';

export const retrieveProductList = createAction('[Product] Call Product list');
export const retrievedProductListActionSuccess = createAction(
  '[Product] Retrieved Product list',
  props<{
    products: Product[];
  }>()
);
export const retrievedProductListActionError = createAction(
  '[Product] Product list Error',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const retrievedProductActionError = createAction(
  '[Product] Product Error',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const loadProductAction = createAction(
  '[Product] Load Product',
  props<{ id: number }>()
);

export const loadProductPriceAction = createAction(
  '[Product] Load Product Price',
  props<{ id: number }>()
);

export const retrievedProductPriceActionSuccess = createAction(
  '[Product] Retrieved Product Price Success',
  props<{
    productPrice: ProductPrice;
  }>()
);
export const retrievedProductPriceActionError = createAction(
  '[Product] Product Product Price Error',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const saveProduct = createAction(
  '[Product] Save Product',
  props<{ product: Product }>()
);
export const saveProductActionSuccess = createAction(
  '[Product] Save ProductSuccess'
);
export const saveProductActionError = createAction(
  '[Product] Save ProductError',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const setActiveProduct = createAction(
  '[Product] SetActive Product',
  props<{ active: boolean }>()
);

export const navigateToProductList = createAction(
  '[Product] Navigate Product list'
);
export const navigateToProductNew = createAction(
  '[Product] Navigate Product New'
);
export const retrievedProductActionSuccess = createAction(
  '[Product] Load Product Success Action',
  props<{ product: Product }>()
);
export const navigateToProductEdit = createAction(
  '[Product] Navigate Product Edit',
  props<{ product: Product }>()
);

export const setProductCategoryId = createAction(
  '[Product] Set CategoryId',
  props<{ idCategory: number }>()
);
