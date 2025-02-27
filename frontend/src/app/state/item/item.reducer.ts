import { ItemState } from './item.selectors';
import { retrievedItemsWithoutInventoryListActionSuccess } from './item.action';

export const initialItemState: ItemState = {
  items: [],
  itemsWithInventoryList: [],
};

export function itemReducer(state = initialItemState, action: any): ItemState {
  switch (action.type) {
    case retrievedItemsWithoutInventoryListActionSuccess.type:
      return {
        ...state,
        itemsWithInventoryList: action.itemWithoutInventory,
      };
    default:
      return state;
  }
}
