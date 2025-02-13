import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Category} from '../../api';
import {Features} from '../../../features';

export interface CategoryState {
  categories: Category[],
  categoryEdit: Category | undefined
}

const selectCategoriesFutureState = createFeatureSelector<CategoryState>(Features.categories);
export const getCategoriesList = createSelector(selectCategoriesFutureState, (state) => state.categories
);
export const selectCategoryById = (id: number) =>
  createSelector(selectCategoriesFutureState, appState => appState.categories.find(category => category.idCategory === id));
