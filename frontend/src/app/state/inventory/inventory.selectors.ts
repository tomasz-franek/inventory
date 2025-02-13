import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Inventory} from '../../api';
import * as AppState from '../app.state';
import {Features} from '../../../features';

export interface State extends AppState.State {
  inventories: InventoryState;
}

export interface InventoryState {
  inventories: Inventory[],
  inventoryEdit: Inventory | undefined
}

export const selectInventories = createFeatureSelector<InventoryState>(Features.inventories);

export const selectInventoryById = (id: number) =>
  createSelector(selectInventories, appState => appState.inventories.find(inventory => inventory.id === id));
