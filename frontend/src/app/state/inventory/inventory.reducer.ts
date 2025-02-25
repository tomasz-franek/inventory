import {
  retrievedInventoryActionSuccess,
  retrievedInventoryListActionSuccess,
  saveInventory,
  setActiveInventory,
} from './inventory.action';
import { InventoryState } from './inventory.selectors';

export const initialInventoryState: InventoryState = {
  inventories: [],
  inventoryEdit: {
    name: '',
    active: false,
    optLock: 0,
  },
  active: true,
};

export function inventoryReducer(
  state = initialInventoryState,
  action: any
): InventoryState {
  switch (action.type) {
    case saveInventory.type:
      if (action.inventory.id !== undefined) {
        return {
          ...state,
          inventories: state.inventories.map((inventory) =>
            inventory.idInventory === action.inventory.id
              ? action.inventory
              : inventory
          ),
        };
      } else {
        return {
          ...state,
          inventories: [...state.inventories, action.inventory],
        };
      }
    case retrievedInventoryListActionSuccess.type:
      return { ...state, inventories: action.inventories };
    case retrievedInventoryActionSuccess.type:
      return { ...state, inventoryEdit: action.inventory };
    case setActiveInventory.type:
      return { ...state, active: action.active };
    default:
      return state;
  }
}
