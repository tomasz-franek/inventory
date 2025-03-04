import { CategoryState } from './category.selectors';
import {
  retrievedCategoryActionSuccess,
  retrievedCategoryListActionSuccess,
  saveCategory,
  setActiveCategory,
} from './category.action';
import { createReducer, on } from '@ngrx/store';

export const initialCategoryState: CategoryState = {
  categories: [],
  categoryEdit: {
    name: '',
    active: false,
    optLock: 0,
  },
  active: true,
};

export const categoryReducer = createReducer(
  initialCategoryState,

  on(saveCategory, (state, action): CategoryState => {
    if (action.category.idCategory !== undefined) {
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.idCategory === action.category.idCategory
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
  }),
  on(retrievedCategoryListActionSuccess, (state, action): CategoryState => {
    return { ...state, categories: action.categories };
  }),
  on(retrievedCategoryActionSuccess, (state, action): CategoryState => {
    return { ...state, categoryEdit: action.category };
  }),
  on(setActiveCategory, (state, action): CategoryState => {
    return { ...state, active: action.active };
  })
);
