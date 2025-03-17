import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConsumeProduct, Item, StorageItem } from '../../api';
import { Features } from '../../../features';

export interface ItemState {
  items: Item[];
  itemsWithoutInventoryList: StorageItem[];
  consumeProductList: ConsumeProduct[];
}

const selectItemsFutureState = createFeatureSelector<ItemState>(Features.items);
export const getItemsWithInventoryList = createSelector(
  selectItemsFutureState,
  (state) => state.itemsWithoutInventoryList
);

export const selectConsumeProductList = createSelector(
  selectItemsFutureState,
  (state) => state.consumeProductList
);
