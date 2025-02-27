import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Item } from '../../api';
import { Features } from '../../../features';

export interface ItemState {
  items: Item[];
  itemsWithInventoryList: Item[];
}

const selectItemsFutureState = createFeatureSelector<ItemState>(Features.items);
export const getItemsWithInventoryList = createSelector(
  selectItemsFutureState,
  (state) => state.itemsWithInventoryList
);
