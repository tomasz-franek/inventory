import { ItemState } from './item.selectors';
import { retrievedItemsWithoutInventoryListActionSuccess } from './item.action';

export const initialItemState: ItemState = {
  items: [],
  itemsWithoutInventoryList: [],
};

export function itemReducer(state = initialItemState, action: any): ItemState {
  switch (action.type) {
    case retrievedItemsWithoutInventoryListActionSuccess.type:
      return {
        ...state,
        itemsWithoutInventoryList: action.itemsWithoutInventoryList,
      };
    default:
      return state;
  }
}
