import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Inventory} from '../../api';
import {Features} from '../../../features';

export interface InventoryState {
  inventories: Inventory[],
  inventoryEdit: Inventory | undefined
}

const selectInventoriesFutureState = createFeatureSelector<InventoryState>(Features.inventories);
export const getInventoriesList = createSelector(selectInventoriesFutureState, (state) => state.inventories
);
export const selectInventoryById = (id: number) =>
  createSelector(selectInventoriesFutureState, appState => appState.inventories.find(inventory => inventory.idInventory === id));
