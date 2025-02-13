import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Category} from '../../api';
import * as AppState from '../app.state';
import {Features} from '../../../features';

export interface State extends AppState.State {
  categories: CategoryState;
}

export interface CategoryState {
  categories: Category[],
  categoryEdit: Category | undefined
}

export const selectCategories = createFeatureSelector<CategoryState>(Features.categories);

export const selectCategoryById = (id: number) =>
  createSelector(selectCategories, appState => appState.categories.find(category => category.id === id));
