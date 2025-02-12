import {createAction, props} from '@ngrx/store';
import {Inventory} from '../../api';
import {HttpErrorResponse} from '@angular/common/http';

export const retrievedInventoryList = createAction('[Inventory] Call Inventory list');
export const retrievedInventoryListActionSuccess = createAction('[Inventory] Retrieved Inventory list', props<{
  inventories: Inventory[]
}>());
export const retrievedInventoryListActionError = createAction('[Inventory] Inventory list Error', props<{
  error: HttpErrorResponse
}>());

export const saveInventory = createAction('[Inventory] Save Inventory', props<{ inventory: Inventory }>());
export const saveInventoryActionSuccess = createAction('[Inventory] Save InventorySuccess');
export const saveInventoryActionError = createAction('[Inventory] Save InventoryError', props<{
  error: HttpErrorResponse
}>());
