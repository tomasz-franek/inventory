import { createAction, props } from '@ngrx/store';
import { Storage } from '../../api';
import { HttpErrorResponse } from '@angular/common/http';

export const retrievedStorageList = createAction('[Storage] Call Storage list');
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
