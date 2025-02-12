import {Category, Inventory} from '../../api';
import {retrievedCategoryListActionSuccess, saveCategory} from './category.action';

export interface AppState {
  categories: Category[],
  categoryEdit: Category | undefined
  inventories: Inventory[],
  inventoryEdit: Inventory | undefined
}

export const initialState: AppState = {
  categories: [],
  categoryEdit: undefined,
  inventories: [],
  inventoryEdit: undefined
};

export function categoryReducer(state = initialState, action: any): AppState {
  switch (action.type) {
    case saveCategory.type:
      if (action.category.id !== undefined) {
        return {
          ...state,
          categories: state.categories.map(category => (category.id === action.category.id ? action.category : category))
        };
      } else {
        return {
          ...state, categories: [...state.categories, action.category]
        };

      }
    case retrievedCategoryListActionSuccess.type:
      return {...state, categories: action.categories};
    default:
      return state;
  }
}


