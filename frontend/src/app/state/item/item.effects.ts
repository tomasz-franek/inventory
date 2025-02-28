import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import { catchError, concatMap, mergeMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  retrievedItemsListActionError,
  retrievedItemsWithoutInventory,
  retrievedItemsWithoutInventoryListActionSuccess,
} from './item.action';
import { ItemState } from './item.selectors';

@Injectable()
export class ItemsEffects {
  private store$: Store<ItemState> = inject(Store);
  private _apiService$: ApiService = inject(ApiService);

  loadItemsWithoutInventory$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrievedItemsWithoutInventory),
      withLatestFrom(this.store$.select(retrievedItemsWithoutInventory)),
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
}
