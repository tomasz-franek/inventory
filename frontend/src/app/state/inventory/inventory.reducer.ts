import {
  retrievedInventoryActionSuccess,
  retrievedInventoryListActionSuccess,
  saveInventory,
  setActiveInventory,
} from './inventory.action';
import { InventoryState } from './inventory.selectors';
import { createReducer, on } from '@ngrx/store';

export const initialInventoryState: InventoryState = {
  inventories: [],
  inventoryEdit: {
    name: '',
    active: false,
    optLock: 0,
  },
  active: true,
};
export const inventoryReducer = createReducer(
  initialInventoryState,
  on(saveInventory, (state, action): InventoryState => {
    if (action.inventory.idInventory !== undefined) {
      return {
        ...state,
        inventories: state.inventories.map((inventory) =>
          inventory.idInventory === action.inventory.idInventory
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
  }),
  on(retrievedInventoryListActionSuccess, (state, action): InventoryState => {
    return { ...state, inventories: action.inventories };
  }),
  on(retrievedInventoryActionSuccess, (state, action): InventoryState => {
    return { ...state, inventoryEdit: action.inventory };
  }),
  on(setActiveInventory, (state, action): InventoryState => {
    return { ...state, active: action.active };
  })
);
