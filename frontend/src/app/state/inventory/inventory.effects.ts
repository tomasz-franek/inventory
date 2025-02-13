import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../services/api.service';
import {
  retrievedInventoryList,
  retrievedInventoryListActionError,
  retrievedInventoryListActionSuccess,
  saveInventory,
  saveInventoryActionError,
  saveInventoryActionSuccess
} from './inventory.action';
import {catchError, concatMap, map, mergeMap, Observable} from 'rxjs';
import {Inventory} from '../../api';

@Injectable()
export class InventoryEffects {
  private _actions$: Actions = inject(Actions);
  private _apiService: ApiService = inject(ApiService);

  loadInventories$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(retrievedInventoryList),
      mergeMap(() => {
          return this._apiService.getInventories().pipe(map((data) => {
            return retrievedInventoryListActionSuccess({inventories: data});
          }));
        }
      ),
      catchError((error: any) => {
        return [retrievedInventoryListActionError({error})];
      })
    );
  });

  save$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(saveInventory),
      mergeMap((action) => {
        const inventory = Object.assign({}, action.inventory);
        return this._getCreateOrUpdateObservable(inventory).pipe(
          concatMap(() => {
            return [saveInventoryActionSuccess];
          }),
          catchError((error: any) => {
            return [saveInventoryActionError({error})];
          })
        );
      })
    );
  });

  private _getCreateOrUpdateObservable(inventory: Inventory): Observable<any> {
    if (inventory.idInventory !== null && inventory.idInventory !== undefined) {
      return this._apiService.updateInventory(inventory.idInventory, inventory);
    }
    inventory.optLock = inventory.optLock || 0;
    return this._apiService.createInventory(inventory);
  }
}

