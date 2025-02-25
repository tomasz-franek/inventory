import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Category } from '../../api';
import { Features } from '../../../features';

export interface CategoryState {
  categories: Category[];
  categoryEdit: Category;
  active: boolean;
}

export const selectCategoriesFutureState = createFeatureSelector<CategoryState>(
  Features.categories
);

export const getCategoriesList = createSelector(
  selectCategoriesFutureState,
  (state) => state.categories
);

export const selectActive = createSelector(
  selectCategoriesFutureState,
  (state) => state.active
);

export const filterCategory = createSelector(
  selectCategoriesFutureState,
  selectActive,
  (state, active) => {
    if (active) {
      return state.categories;
    } else {
      return state.categories.filter((category) => category.active);
    }
  }
);

export const selectCategoryById = (id: number) =>
  createSelector(selectCategoriesFutureState, (appState) =>
    appState.categories.find((category) => category.idCategory === id)
  );

export const newCategorySelector = createSelector(
  selectCategoriesFutureState,
  () => {
    return {} as Category;
  }
);

export const editCategorySelector = createSelector(
  selectCategoriesFutureState,
  (state) => state.categoryEdit
);
