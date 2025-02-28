import { createAction, props } from '@ngrx/store';
import { Storage } from '../../api';
import { HttpErrorResponse } from '@angular/common/http';

export const retrieveStorageList = createAction('[Storage] Call Storage list');
export const retrievedStorageListActionSuccess = createAction(
  '[Storage] Retrieved Storage list',
  props<{
    storages: Storage[];
  }>()
);
export const retrievedStorageListActionError = createAction(
  '[Storage] Storage list Error',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const saveStorage = createAction(
  '[Storage] Save Storage',
  props<{ storage: Storage }>()
);
export const saveStorageActionSuccess = createAction(
  '[Storage] Save StorageSuccess'
);
export const saveStorageActionError = createAction(
  '[Storage] Save StorageError',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const setStorageEdit = createAction(
  '[Storage] Set Storage Edit',
  props<{ storageEdit: Storage }>()
);
export const navigateToStorageNew = createAction(
  '[Storage] Navigate to Storage New'
);

export const navigateToStorageEdit = createAction(
  '[Storage] Navigate to Storage Edit',
  props<{ storage: Storage }>()
);

export const navigateToStorageList = createAction(
  '[Storage] Navigate to Storage'
);

export const selectStorageByCategoryAndProduct = createAction(
  '[Storage] Select Storage by Category And Product'
);

export const setStorageCategoryId = createAction(
  '[Storage] Set CategoryId',
  props<{ idCategory: number }>()
);
export const setStorageProductId = createAction(
  '[Storage] Set ProductId',
  props<{ idProduct: number }>()
);
export const setStorageInventoryId = createAction(
  '[Storage] Set InventoryId',
  props<{ idInventory: number }>()
);

export const setStorageUnitId = createAction(
  '[Storage] Set UnitId',
  props<{ idUnit: number }>()
);
export const setHideUsed = createAction(
  '[Storage] Set Hide Used',
  props<{ hideUsed: boolean }>()
);
