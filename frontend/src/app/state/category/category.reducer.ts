import { CategoryState } from './category.selectors';
import {
  retrievedCategoryActionSuccess,
  retrievedCategoryListActionSuccess,
  saveCategory,
  setActiveCategory,
} from './category.action';

export const initialCategoryState: CategoryState = {
  categories: [],
  categoryEdit: {
    name: '',
    active: false,
    optLock: 0,
  },
  active: true,
};

export function categoryReducer(
  state = initialCategoryState,
  action: any
): CategoryState {
  switch (action.type) {
    case saveCategory.type:
      if (action.category.id !== undefined) {
        return {
          ...state,
          categories: state.categories.map((category) =>
            category.idCategory === action.category.id
              ? action.category
              : category
          ),
        };
      } else {
        return {
          ...state,
          categories: [...state.categories, action.category],
        };
      }
    case retrievedCategoryListActionSuccess.type:
      return { ...state, categories: action.categories };
    case retrievedCategoryActionSuccess.type:
      return { ...state, categoryEdit: action.category };
    case setActiveCategory.type:
      return { ...state, active: action.active };
    default:
      return state;
  }
}
