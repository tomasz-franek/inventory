import { StorageState } from './storage.selectors';
import {
  retrievedStorageListActionSuccess,
  saveStorage,
  selectStorageByCategoryAndProduct,
  setHideUsed,
  setStorageCategoryId,
  setStorageEdit,
  setStorageProductId,
} from './storage.action';

export const initialStorageState: StorageState = {
  storages: [],
  storageEdit: undefined,
  selectedCategoryId: 0,
  selectedProductId: 0,
  selectedStorages: [],
  hideUsed: true,
};

export function storageReducer(
  state: StorageState = initialStorageState,
  action: any
): StorageState {
  switch (action.type) {
    case saveStorage.type:
      if (action.storage.id !== undefined) {
        return {
          ...state,
          storages: state.storages.map((storage) =>
            storage.idStorage === action.storage.id ? action.storage : storage
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
    case retrievedStorageListActionSuccess.type:
      return {
        ...state,
        storages: action.storages,
        selectedStorages: action.storages,
      };
    case selectStorageByCategoryAndProduct.type: {
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
    }
    case setStorageEdit.type:
      return { ...state, storageEdit: action.storageEdit };
    case setStorageCategoryId.type:
      return { ...state, selectedCategoryId: action.idCategory };
    case setStorageProductId.type:
      return { ...state, selectedProductId: action.idProduct };
    case setHideUsed.type:
      return { ...state, hideUsed: action.hideUsed };
    default:
      return state;
  }
}
