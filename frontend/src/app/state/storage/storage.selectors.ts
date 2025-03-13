import { Features } from '../../../features';
import { Storage } from '../../api';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface StorageState {
  storages: Storage[];
  storageEdit: Storage | undefined;
  selectedCategoryId: number;
  selectedProductId: number;
  selectedInventoryId: number;
  selectedUnitId: number;
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

export const selectStorageEdit = createSelector(
  selectAllStoragesFutureState,
  (appState) => appState.storageEdit
);

export const selectHideUsed = createSelector(
  selectAllStoragesFutureState,
  (appState) => appState.hideUsed
);

export const selectCategoryId = createSelector(
  selectAllStoragesFutureState,
  (appState) => appState.selectedCategoryId
);

export const selectProductId = createSelector(
  selectAllStoragesFutureState,
  (appState) => appState.selectedProductId
);

export const filterStorages = createSelector(
  selectAllStoragesFutureState,
  selectHideUsed,
  selectCategoryId,
  selectProductId,
  (state, hideUsed: boolean, idCategory: number, idProduct: number) => {
    if (hideUsed) {
      return state.storages.filter((storage) => {
        return (
          storage.used < 100.0 &&
          (idCategory > 0 ? storage.idCategory == idCategory : true) &&
          (idProduct > 0 ? storage.idProduct == idProduct : true)
        );
      });
    } else {
      return state.storages.filter((storage) => {
        return (
          (idCategory > 0 ? storage.idCategory == idCategory : true) &&
          (idProduct > 0 ? storage.idProduct == idProduct : true)
        );
      });
    }
  }
);
