import {StorageState} from './storage.selectors';
import {retrievedStorageListActionSuccess, saveStorage} from './storage.action';


export const initialStorageState: StorageState = {
  storages: [],
  storageEdit: undefined
};

export function storageReducer(state: StorageState = initialStorageState, action: any): StorageState {
  switch (action.type) {
    case saveStorage.type:
      if (action.storage.id !== undefined) {
        return {
          ...state,
          storages: state.storages.map(storage => (storage.idStorage === action.storage.id ? action.storage : storage))
        };
      } else {
        return {
          ...state, storages: [...state.storages, action.storage]
        };

      }
    case retrievedStorageListActionSuccess.type:
      return {...state, storages: action.storages};
    default:
      return state;
  }
}


