import { ItemState } from './item.selectors';
import {
  retrievedConsumeProductListActionSuccess,
  retrievedItemsWithoutInventoryListActionSuccess,
} from './item.action';
import { createReducer, on } from '@ngrx/store';

export const initialItemState: ItemState = {
  items: [],
  itemsWithoutInventoryList: [],
  consumeProductList: [],
};
export const itemReducer = createReducer(
  initialItemState,
  on(
    retrievedItemsWithoutInventoryListActionSuccess,
    (state, action): ItemState => {
      return {
        ...state,
        itemsWithoutInventoryList: action.itemsWithoutInventoryList,
      };
    }
  ),
  on(retrievedConsumeProductListActionSuccess, (state, action): ItemState => {
    return {
      ...state,
      consumeProductList: action.consumeProductList,
    };
  })
);
