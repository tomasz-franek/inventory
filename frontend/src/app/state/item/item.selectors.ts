import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Item } from '../../api';
import { Features } from '../../../features';

export interface ItemState {
  items: Item[];
  itemsWithoutInventoryList: Item[];
}

const selectItemsFutureState = createFeatureSelector<ItemState>(Features.items);
export const getItemsWithInventoryList = createSelector(
  selectItemsFutureState,
  (state) => state.itemsWithoutInventoryList
);
