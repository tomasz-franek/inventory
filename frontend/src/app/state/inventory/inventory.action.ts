import { createAction, props } from '@ngrx/store';
import { Inventory } from '../../api';
import { HttpErrorResponse } from '@angular/common/http';

export const retrieveInventoryList = createAction(
  '[Inventory] Call Inventory list'
);
export const retrievedInventoryListActionSuccess = createAction(
  '[Inventory] Retrieved Inventory list',
  props<{
    inventories: Inventory[];
  }>()
);
export const retrievedInventoryListActionError = createAction(
  '[Inventory] Inventory list Error',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const setActiveInventory = createAction(
  '[Inventory] SetActive',
  props<{ active: boolean }>()
);

export const loadInventoryAction = createAction(
  '[Inventory] Load Inventory',
  props<{ id: number }>()
);

export const navigateToInventoryList = createAction(
  '[Inventory] Navigate Inventory list'
);
export const navigateToInventoryNew = createAction(
  '[Inventory] Navigate Inventory New'
);
export const retrievedInventoryActionSuccess = createAction(
  '[Inventory] Load Inventory Success Action',
  props<{ inventory: Inventory }>()
);

export const retrievedInventoryActionError = createAction(
  '[Inventory] Load Inventory Error Action',
  props<{
    error: HttpErrorResponse;
  }>()
);
export const navigateToInventoryEdit = createAction(
  '[Inventory] Navigate Inventory Edit',
  props<{ inventory: Inventory }>()
);

export const saveInventory = createAction(
  '[Inventory] Save Inventory',
  props<{ inventory: Inventory }>()
);
export const saveInventoryActionSuccess = createAction(
  '[Inventory] Save InventorySuccess'
);
export const saveInventoryActionError = createAction(
  '[Inventory] Save InventoryError',
  props<{
    error: HttpErrorResponse;
  }>()
);
