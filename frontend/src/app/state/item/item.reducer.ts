import { ItemState } from './item.selectors';
import {
  retrievedConsumeProductListActionSuccess,
  retrievedItemsWithoutInventoryListActionSuccess,
} from './item.action';

export const initialItemState: ItemState = {
  items: [],
  itemsWithoutInventoryList: [],
  consumeProductList: [],
};

export function itemReducer(state = initialItemState, action: any): ItemState {
  switch (action.type) {
    case retrievedItemsWithoutInventoryListActionSuccess.type:
      return {
        ...state,
        itemsWithoutInventoryList: action.itemsWithoutInventoryList,
      };
    case retrievedConsumeProductListActionSuccess.type:
      return {
        ...state,
        consumeProductList: action.consumeProductList,
      };
    default:
      return state;
  }
}
