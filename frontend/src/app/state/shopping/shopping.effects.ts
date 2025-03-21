import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, Observable, tap } from 'rxjs';
import {
  deleteShopping,
  deleteShoppingActionSuccess,
  loadShoppingAction,
  navigateToShoppingEdit,
  navigateToShoppingList,
  navigateToShoppingNew,
  retrievedDeleteShoppingActionError,
  retrievedShoppingActionError,
  retrievedShoppingActionSuccess,
  retrieveShoppingList,
  retrieveShoppingListActionError,
  retrieveShoppingListActionSuccess,
  saveShopping,
  saveShoppingActionError,
  saveShoppingActionSuccess,
} from './shopping.action';
import { Shopping } from '../../api';

@Injectable()
export class ShoppingEffects {
  private store$ = inject(Store);
  private _apiService$: ApiService = inject(ApiService);
  private router: Router = inject(Router);

  loadShoppingList$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrieveShoppingList),
      mergeMap(() => {
        return this._apiService$.getShoppingList().pipe(
          map((data) => {
            return retrieveShoppingListActionSuccess({ shopping: data });
          })
        );
      }),
      catchError((error: any) => {
        return [retrieveShoppingListActionError({ error })];
      })
    )
  );

  openShoppingList$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToShoppingList),
        tap(() => {
          this.router.navigate(['/shopping']);
        })
      );
    },
    { dispatch: false }
  );

  newShopping$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToShoppingNew),
        tap(() => {
          this.router.navigate(['/shopping-add']);
        })
      );
    },
    { dispatch: false }
  );

  editShopping$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToShoppingEdit),
        tap((action) => {
          this.router.navigate(['/shopping-add', action.shopping.idShopping]);
        })
      );
    },
    { dispatch: false }
  );

  deleteShopping$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(deleteShopping),
      mergeMap((action: any) => {
        return this._apiService$.deleteShopping(action.idShopping).pipe(
          concatMap((data) => {
            return [deleteShoppingActionSuccess(), retrieveShoppingList()];
          })
        );
      }),
      catchError((error: any) => {
        return [retrievedDeleteShoppingActionError({ error })];
      })
    );
  });

  saveShopping$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(saveShopping),
      mergeMap((action) => {
        const shopping = Object.assign({}, action.shopping);
        return this._getCreateOrUpdateObservable(shopping).pipe(
          concatMap(() => {
            return [saveShoppingActionSuccess()];
          }),
          catchError((error: any) => {
            return [saveShoppingActionError({ error })];
          })
        );
      })
    )
  );

  loadShopping$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(loadShoppingAction),
      mergeMap((action) =>
        this._apiService$.getShopping(action.id).pipe(
          map((shopping) => {
            return retrievedShoppingActionSuccess({
              shopping: shopping,
            });
          })
        )
      ),
      catchError((error: any) => {
        return [retrievedShoppingActionError({ error })];
      })
    );
  });

  private _getCreateOrUpdateObservable(shopping: Shopping): Observable<any> {
    if (shopping.idShopping !== undefined) {
      return this._apiService$.updateShopping(shopping.idShopping, shopping);
    }
    shopping.optLock = shopping.optLock || 0;
    return this._apiService$.createShopping(shopping);
  }
}
