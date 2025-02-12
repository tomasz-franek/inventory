import {AppState, initialState} from '../category/category.reducer';
import {retrievedInventoryListActionSuccess, saveInventory} from './inventory.action';

export function inventoryReducer(state = initialState, action: any): AppState {
  switch (action.type) {
    case saveInventory.type:
      if (action.inventory.id !== undefined) {
        return {
          ...state,
          inventories: state.inventories.map(inventory => (inventory.id === action.inventory.id ? action.inventory : inventory))
        };
      } else {
        return {
          ...state, inventories: [...state.inventories, action.inventory]
        };

      }
    case retrievedInventoryListActionSuccess.type:
      return {...state, inventories: action.inventories};
    default:
      return state;
  }
}


