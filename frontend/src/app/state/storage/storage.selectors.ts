import { Features } from '../../../features';
import { Storage } from '../../api';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface StorageState {
  storages: Storage[];
  storageEdit: Storage | undefined;
  selectedCategoryId: number;
  selectedProductId: number;
  selectedStorages: Storage[];
  hideUsed: boolean;
}

const selectAllStoragesFutureState = createFeatureSelector<StorageState>(
  Features.storages
);

export const getSelectedStoragesList = createSelector(
  selectAllStoragesFutureState,
  (state) => state.selectedStorages
);
export const selectStorageById = (id: number) =>
  createSelector(selectAllStoragesFutureState, (appState) =>
    appState.storages.find((storage) => storage.idStorage === id)
  );

export const selectStorageEdit = createSelector(
  selectAllStoragesFutureState,
  (appState) => appState.storageEdit
);
