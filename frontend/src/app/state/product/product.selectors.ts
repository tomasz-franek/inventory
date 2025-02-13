import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Product} from '../../api';
import {Features} from '../../../features';
import * as AppState from '../app.state';

export interface State extends AppState.State {
  products: ProductState;
}

export  interface ProductState{
  products: Product[],
  productEdit: Product | undefined
}
export const selectProducts = createFeatureSelector<ProductState>(Features.products);

export const selectProductById = (id: number) =>
  createSelector(selectProducts, appState => appState.products.find(product => product.id === id));
