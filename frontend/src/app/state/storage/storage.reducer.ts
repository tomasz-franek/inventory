import { StorageState } from './storage.selectors';
import {
  retrievedStorageListActionSuccess,
  saveStorage,
  saveStorageActionSuccess,
  selectStorageByCategoryAndProduct,
  setHideUsed,
  setStorageCategoryId,
  setStorageEdit,
  setStorageInventoryId,
  setStorageProductId,
  setStorageUnitId,
} from './storage.action';
import { createReducer, on } from '@ngrx/store';

export const initialStorageState: StorageState = {
  storages: [],
  storageEdit: undefined,
  selectedCategoryId: 0,
  selectedProductId: 0,
  selectedInventoryId: 0,
  selectedUnitId: 0,
  selectedStorages: [],
  hideUsed: true,
};

export const storageReducer = createReducer(
  initialStorageState,
  on(saveStorage, (state, action): StorageState => {
    if (action.storage.idStorage !== undefined) {
      return {
        ...state,
        storages: state.storages.map((storage) =>
          storage.idStorage === action.storage.idStorage
            ? action.storage
            : storage
        ),
        selectedStorages: state.storages,
      };
    } else {
      return {
        ...state,
        storages: [...state.storages, action.storage],
        selectedStorages: state.storages,
      };
    }
  }),
  on(retrievedStorageListActionSuccess, (state, action): any => {
    return {
      ...state,
      storages: action.storages,
      selectedStorages: action.storages,
    };
  }),
  on(selectStorageByCategoryAndProduct, (state, action): any => {
    return {
      ...state,
      selectedStorages: state.storages.filter(
        (storage) =>
          (state.selectedCategoryId > 0
            ? storage.idCategory == state.selectedCategoryId
            : true) &&
          (state.selectedProductId > 0
            ? storage.idProduct == state.selectedProductId
            : true) &&
          (state.hideUsed ? storage.used < 100.0 : true)
      ),
    };
  }),
  on(setStorageEdit, (state, action): any => {
    return { ...state, storageEdit: action.storageEdit };
  }),
  on(setStorageCategoryId, (state, action): any => {
    return { ...state, selectedCategoryId: action.idCategory };
  }),
  on(setStorageProductId, (state, action): any => {
    return { ...state, selectedProductId: action.idProduct };
  }),
  on(setHideUsed, (state, action): any => {
    return { ...state, hideUsed: action.hideUsed };
  }),
  on(setStorageInventoryId, (state, action): any => {
    return { ...state, selectedInventoryId: action.idInventory };
  }),
  on(setStorageUnitId, (state, action): any => {
    return { ...state, selectedUnitId: action.idUnit };
  }),
  on(saveStorageActionSuccess, (state, action): any => {
    return { ...state };
  })
);
