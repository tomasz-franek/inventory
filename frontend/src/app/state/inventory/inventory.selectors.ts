import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Inventory } from '../../api';
import { Features } from '../../../features';

export interface InventoryState {
  inventories: Inventory[];
  inventoryEdit: Inventory;
  active: boolean;
}

const selectInventoriesFutureState = createFeatureSelector<InventoryState>(
  Features.inventories
);
export const getInventoriesList = createSelector(
  selectInventoriesFutureState,
  (state) => state.inventories
);
export const selectActiveInventory = createSelector(
  selectInventoriesFutureState,
  (state) => state.active
);
export const filterInventories = createSelector(
  selectInventoriesFutureState,
  selectActiveInventory,
  (state, active) => {
    if (active) {
      return state.inventories.filter((inventory) => inventory.active);
    } else {
      return state.inventories;
    }
  }
);
export const selectInventoryById = (id: number) =>
  createSelector(selectInventoriesFutureState, (appState) =>
    appState.inventories.find((inventory) => inventory.idInventory === id)
  );
export const newInventorySelector = createSelector(
  selectInventoriesFutureState,
  () => {
    return {} as Inventory;
  }
);

export const editInventorySelector = createSelector(
  selectInventoriesFutureState,
  (state) => state.inventoryEdit
);
