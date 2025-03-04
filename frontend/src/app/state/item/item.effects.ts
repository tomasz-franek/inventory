import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import { catchError, concatMap, mergeMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  retrieveConsumeProductListInventoryCategory,
  retrieveConsumeProductListInventoryCategoryProduct,
  retrievedConsumeProductListActionError,
  retrievedConsumeProductListActionSuccess,
  retrievedItemsListActionError,
  retrievedItemsWithoutInventoryListActionSuccess,
  retrieveItemsWithoutInventory,
  saveItemActionError,
  saveItemSuccess,
  updateItemByInventory,
} from './item.action';
import { ItemState } from './item.selectors';

@Injectable()
export class ItemsEffects {
  private _storeItem$: Store<ItemState> = inject(Store);
  private _apiService$: ApiService = inject(ApiService);

  loadItemsWithoutInventory$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrieveItemsWithoutInventory),
      withLatestFrom(this._storeItem$.select(retrieveItemsWithoutInventory)),
      mergeMap(() => {
        return this._apiService$.getItemsWithoutInventory().pipe(
          concatMap((data) => {
            return [
              retrievedItemsWithoutInventoryListActionSuccess({
                itemsWithoutInventoryList: data,
              }),
            ];
          })
        );
      }),
      catchError((error: any) => {
        return [retrievedItemsListActionError({ error })];
      })
    )
  );

  loadConsumeProductListInventoryCategoryProduct$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrieveConsumeProductListInventoryCategoryProduct),
      mergeMap((action) => {
        return this._apiService$
          .getConsumeProductListInventoryCategoryProduct(
            action.idInventory,
            action.idCategory,
            action.idProduct
          )
          .pipe(
            concatMap((data) => {
              return [
                retrievedConsumeProductListActionSuccess({
                  consumeProductList: data,
                }),
              ];
            })
          );
      }),
      catchError((error: any) => {
        return [retrievedConsumeProductListActionError({ error })];
      })
    )
  );

  loadConsumeProductListInventoryCategory$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrieveConsumeProductListInventoryCategory),
      mergeMap((action) => {
        return this._apiService$
          .getConsumeProductListInventoryCategory(
            action.idInventory,
            action.idCategory
          )
          .pipe(
            concatMap((data) => {
              return [
                retrievedConsumeProductListActionSuccess({
                  consumeProductList: data,
                }),
              ];
            })
          );
      }),
      catchError((error: any) => {
        return [retrievedConsumeProductListActionError({ error })];
      })
    )
  );

  updateItemInventory$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(updateItemByInventory),
      mergeMap((action) => {
        return this._apiService$
          .updateItemByInventoryId(action.idItem, action.idInventory)
          .pipe(
            concatMap((data) => {
              return [saveItemSuccess()];
            })
          );
      }),
      catchError((error: any) => {
        return [saveItemActionError({ error })];
      })
    )
  );
}
