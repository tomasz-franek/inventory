import {retrievedCategoryListActionSuccess, saveCategory} from './category.action';
import {CategoryState} from './category.selectors';

export const initialCategoryState: CategoryState = {
  categories: [],
  categoryEdit: undefined
};

export function categoryReducer(state = initialCategoryState, action: any): CategoryState {
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


