import {createSelector} from '@ngrx/store';
import {AppState} from './category.reducer';

export const selectCategories = (state: AppState) => state;

export const selectCategoryById = (id: number) =>
  createSelector(selectCategories, appState => appState.categories.find(category => category.id === id));
