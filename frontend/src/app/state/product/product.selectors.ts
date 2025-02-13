import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Product} from '../../api';
import {Features} from '../../../features';

export  interface ProductState{
  products: Product[],
  productEdit: Product | undefined
}

const selectProductsFutureState = createFeatureSelector<ProductState>(Features.products);

export const getProductsList = createSelector(selectProductsFutureState, (state) => state.products
);
export const selectProductById = (id: number) =>
  createSelector(selectProductsFutureState, appState => appState.products.find(product => product.idProduct === id));
