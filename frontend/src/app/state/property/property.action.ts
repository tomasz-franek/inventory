import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Property } from '../../api';

export const retrievedPropertyForUser = createAction(
  '[Property] Call Property',
  props<{ idUser: number }>()
);
export const retrievedPropertyForUserActionSuccess = createAction(
  '[Property] Retrieved Property',
  props<{
    property: Property;
  }>()
);
export const retrievedPropertyForUserActionError = createAction(
  '[Property] Property Error',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const saveProperty = createAction(
  '[Property] Save Property',
  props<{ property: Property }>()
);

export const savePropertySuccess = createAction(
  '[Property] Save Property Success'
);

export const savePropertyActionError = createAction(
  '[Property] Save Property Error',
  props<{
    error: HttpErrorResponse;
  }>()
);
