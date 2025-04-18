import { createAction, props } from '@ngrx/store';
import { Category } from '../../api';
import { HttpErrorResponse } from '@angular/common/http';

export const retrieveCategoryList = createAction(
  '[Category] Call Category list'
);
export const retrievedCategoryListActionSuccess = createAction(
  '[Category] Retrieved Category list',
  props<{
    categories: Category[];
  }>()
);

export const retrievedCategoryActionSuccess = createAction(
  '[Category] Load Category Success Action',
  props<{ category: Category }>()
);
export const navigateToCategoryList = createAction(
  '[Category] Navigate Category list'
);
export const navigateToCategoryNew = createAction(
  '[Category] Navigate Category New'
);
export const navigateToCategoryEdit = createAction(
  '[Category] Navigate Category Edit',
  props<{ category: Category }>()
);

export const setActiveCategory = createAction(
  '[Category] SetActive',
  props<{ active: boolean }>()
);
export const retrievedCategoryListActionError = createAction(
  '[Category] Category list Error',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const retrievedCategoryActionError = createAction(
  '[Category] Retrieve Category Error',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const loadCategoryAction = createAction(
  '[Category] Load Category',
  props<{ id: number }>()
);

export const saveCategory = createAction(
  '[Category] Save Category',
  props<{ category: Category }>()
);
export const saveCategoryActionSuccess = createAction(
  '[Category] Save CategorySuccess'
);
export const saveCategoryActionError = createAction(
  '[Category] Save CategoryError',
  props<{
    error: HttpErrorResponse;
  }>()
);
