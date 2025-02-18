import { Features } from '../../../features';
import { Storage } from '../../api';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface StorageState {
  storages: Storage[];
  storageEdit: Storage | undefined;
}

const selectAllStoragesFutureState = createFeatureSelector<StorageState>(
  Features.storages
);

export const getStoragesList = createSelector(
  selectAllStoragesFutureState,
  (state) => state.storages
);
export const selectStorageById = (id: number) =>
  createSelector(selectAllStoragesFutureState, (appState) =>
    appState.storages.find((storage) => storage.idStorage === id)
  );
