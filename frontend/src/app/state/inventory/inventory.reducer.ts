import {retrievedInventoryListActionSuccess, saveInventory} from './inventory.action';
import {InventoryState} from './inventory.selectors';

export const initialInventoryState: InventoryState = {
  inventories: [],
  inventoryEdit: undefined
};

export function inventoryReducer(state = initialInventoryState, action: any): InventoryState {
  switch (action.type) {
    case saveInventory.type:
      if (action.inventory.id !== undefined) {
        return {
          ...state,
          inventories: state.inventories.map(inventory => (inventory.idInventory === action.inventory.id ? action.inventory : inventory))
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


