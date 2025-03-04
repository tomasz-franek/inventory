import { Shopping } from '../../api';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '../../../features';

export interface ShoppingState {
  shoppingList: Shopping[];
  shoppingEdit: Shopping;
}

export const selectShoppingFutureState = createFeatureSelector<ShoppingState>(
  Features.shopping
);

export const getShoppingList = createSelector(
  selectShoppingFutureState,
  (state) => state.shoppingList
);

export const editShoppingSelector = createSelector(
  selectShoppingFutureState,
  (state) => state.shoppingEdit
);
