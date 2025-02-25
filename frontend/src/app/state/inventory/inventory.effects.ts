import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import {
  loadInventoryAction,
  navigateToInventoryEdit,
  navigateToInventoryList,
  navigateToInventoryNew,
  retrievedInventoryActionSuccess,
  retrievedInventoryList,
  retrievedInventoryListActionError,
  retrievedInventoryListActionSuccess,
  saveInventory,
  saveInventoryActionError,
  saveInventoryActionSuccess,
} from './inventory.action';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  Observable,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Inventory } from '../../api';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InventoryState } from './inventory.selectors';

@Injectable()
export class InventoryEffects {
  private store$: Store<InventoryState> = inject(Store);
  private _apiService$: ApiService = inject(ApiService);
  private router: Router = inject(Router);

  save$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(saveInventory),
      mergeMap((action) => {
        const inventory = Object.assign({}, action.inventory);
        return this._getCreateOrUpdateObservable(inventory).pipe(
          concatMap(() => {
            return [saveInventoryActionSuccess(), navigateToInventoryList()];
          }),
          catchError((error: any) => {
            return [saveInventoryActionError({ error })];
          })
        );
      })
    );
  });

  loadInventories$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrievedInventoryList),
      withLatestFrom(this.store$.select(retrievedInventoryList)),
      mergeMap(() => {
        return this._apiService$.getInventories().pipe(
          concatMap((data) => {
            return [retrievedInventoryListActionSuccess({ inventories: data })];
          })
        );
      }),
      catchError((error: any) => {
        return [retrievedInventoryListActionError({ error })];
      })
    )
  );

  loadInventory$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(loadInventoryAction),
      mergeMap((action) =>
        this._apiService$.getInventory(action.id).pipe(
          map((inventory) => {
            return retrievedInventoryActionSuccess({
              inventory: inventory,
            });
          })
        )
      )
    );
  });

  openInventoryList$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToInventoryList),
        tap(() => {
          this.router.navigate(['/inventories']);
        })
      );
    },
    { dispatch: false }
  );

  newInventory$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToInventoryNew),
        tap(() => {
          this.router.navigate(['/inventory-add']);
        })
      );
    },
    { dispatch: false }
  );

  editInventory$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToInventoryEdit),
        tap((action) => {
          this.router.navigate([
            '/inventory-add',
            action.inventory.idInventory,
          ]);
        })
      );
    },
    { dispatch: false }
  );

  private _getCreateOrUpdateObservable(inventory: Inventory): Observable<any> {
    if (inventory.idInventory !== null && inventory.idInventory !== undefined) {
      return this._apiService$.updateInventory(
        inventory.idInventory,
        inventory
      );
    }
    inventory.optLock = inventory.optLock || 0;
    return this._apiService$.createInventory(inventory);
  }
}
