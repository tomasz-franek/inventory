import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../../api';
import { Features } from '../../../features';
import { setActiveCategory } from '../category/category.action';

export interface ProductState {
  products: Product[];
  productEdit: Product;
  idCategory: number;
  active: boolean;
}

const selectProductsFutureState = createFeatureSelector<ProductState>(
  Features.products
);

export const getProductsList = createSelector(
  selectProductsFutureState,
  (state) => state.products
);
export const selectProductById = (id: number) =>
  createSelector(selectProductsFutureState, (appState) =>
    appState.products.find((product) => product.idProduct === id)
  );

export const selectActiveProduct = createSelector(
  selectProductsFutureState,
  (state) => state.active
);
export const filterProducts = createSelector(
  selectProductsFutureState,
  selectActiveProduct,
  (state, active) => {
    if (active) {
      return state.products.filter((product) => product.active);
    } else {
      return state.products;
    }
  }
);

export const filterProductByCategory = createSelector(
  selectProductsFutureState,
  setActiveCategory,
  (state) => {
    if (state.idCategory != 0) {
      return state.products.filter(
        (product) =>
          product.idCategory == state.idCategory &&
          (state.active ? state.active == product.active : true)
      );
    } else {
      return state.products.filter((product) =>
        state.active ? state.active == product.active : true
      );
    }
  }
);

export const newProductSelector = createSelector(
  selectProductsFutureState,
  () => {
    return {} as Product;
  }
);

export const editProductSelector = createSelector(
  selectProductsFutureState,
  (state) => state.productEdit
);
