import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemWithoutInventory } from '../../api';

export const retrievedItemsWithoutInventory = createAction(
  '[Item] Retrieved items Without Inventory'
);
export const retrievedItemsWithoutInventoryListActionSuccess = createAction(
  '[Item] Retrieved Items Without Inventory Action Success',
  props<{
    itemWithoutInventory: ItemWithoutInventory[];
  }>()
);
export const retrievedItemsListActionError = createAction(
  '[Item] Retrieved Items Without Inventory Action Error',
  props<{
    error: HttpErrorResponse;
  }>()
);
