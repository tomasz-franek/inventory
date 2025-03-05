import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ConsumeProduct, Item, ItemConsume } from '../../api';

export const retrieveItemsWithoutInventory = createAction(
  '[Item] Retrieve items Without Inventory'
);
export const retrievedItemsWithoutInventoryListActionSuccess = createAction(
  '[Item] Retrieved Items Without Inventory Action Success',
  props<{
    itemsWithoutInventoryList: Item[];
  }>()
);
export const retrievedItemsListActionError = createAction(
  '[Item] Retrieved Items Without Inventory Action Error',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const retrieveConsumeProductListInventoryCategoryProduct = createAction(
  '[Item] Retrieve Consume Product Inventory Category Product',
  props<{
    idInventory: number;
    idCategory: number;
    idProduct: number;
  }>()
);

export const retrieveConsumeProductListInventoryCategory = createAction(
  '[Item] Retrieve Consume Product Inventory Category',
  props<{
    idInventory: number;
    idCategory: number;
  }>()
);

export const retrievedConsumeProductListActionSuccess = createAction(
  '[Item] Retrieved Consume ProductList Success',
  props<{
    consumeProductList: ConsumeProduct[];
  }>()
);
export const retrievedConsumeProductListActionError = createAction(
  '[Item] Retrieved Consume Products Action Error',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const updateItemByInventory = createAction(
  '[Item] Update Item By Inventory',
  props<{ idItem: number; idInventory: number }>()
);

export const consumeItem = createAction(
  '[Item] Update Item By Inventory',
  props<{ itemToConsume: ItemConsume }>()
);

export const saveItemActionError = createAction(
  '[Item] Save Item Action Error',
  props<{
    error: HttpErrorResponse;
  }>()
);
export const saveItemSuccess = createAction('[Item] Save Item Success');
export const consumeItemSuccess = createAction('[Item] Consume Item Success');
