import {createAction, props} from '@ngrx/store';
import {Category} from '../../api';
import {HttpErrorResponse} from '@angular/common/http';

export const retrievedCategoryList = createAction('[Category] Call Category list');
export const retrievedCategoryListActionSuccess = createAction('[Category] Retrieved Category list', props<{
  categories: Category[]
}>());
export const retrievedCategoryListActionError = createAction('[Category] Category list Error', props<{
  error: HttpErrorResponse
}>());

export const saveCategory = createAction('[Category] Save Category', props<{ category: Category }>());
export const saveCategoryActionSuccess = createAction('[Category] Save CategorySuccess');
export const saveCategoryActionError = createAction('[Category] Save CategoryError', props<{
  error: HttpErrorResponse
}>());
