import {AppState} from '../category/category.reducer';
import {createSelector} from '@ngrx/store';

export const selectInventories = (state: AppState) => state;

export const selectInventoryById = (id: number) =>
  createSelector(selectInventories, appState => appState.inventories.find(inventory => inventory.id === id));
