import { createAction, props } from '@ngrx/store';
import { Unit } from '../../api';
import { HttpErrorResponse } from '@angular/common/http';

export const retrieveUnitList = createAction('[Unit] Call Unit list');
export const retrieveUnitListActionSuccess = createAction(
  '[Unit] Retrieved Unit list',
  props<{
    units: Unit[];
  }>()
);
export const retrieveUnitListActionError = createAction(
  '[Unit] Unit list Error',
  props<{
    error: HttpErrorResponse;
  }>()
);
