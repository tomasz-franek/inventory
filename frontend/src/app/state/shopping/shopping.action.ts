import { createAction, props } from '@ngrx/store';
import { Shopping } from '../../api';
import { HttpErrorResponse } from '@angular/common/http';

export const retrievedShoppingList = createAction(
  '[Shopping] Call Shopping list'
);

export const retrievedShoppingListActionSuccess = createAction(
  '[Shopping List] Success',
  props<{ shopping: Shopping[] }>()
);

export const retrievedShoppingListActionError = createAction(
  '[Shopping List] Product list Error',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const navigateToShoppingList = createAction(
  '[Shopping] Navigate to Shopping List'
);

export const navigateToShoppingNew = createAction(
  '[Shopping New] Navigate to Shopping New'
);

export const navigateToShoppingEdit = createAction(
  '[Shopping Edit] Navigate to Shopping Edit',
  props<{ shopping: Shopping }>()
);

export const deleteShopping = createAction(
  '[Shopping] Delete Shopping List',
  props<{ idShopping: number }>()
);
