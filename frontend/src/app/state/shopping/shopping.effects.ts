import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs';
import {
  navigateToShoppingEdit,
  navigateToShoppingList,
  navigateToShoppingNew,
  retrievedShoppingList,
  retrievedShoppingListActionError,
  retrievedShoppingListActionSuccess,
} from './shopping.action';

@Injectable()
export class ShoppingEffects {
  private store$ = inject(Store);
  private _apiService$: ApiService = inject(ApiService);
  private router: Router = inject(Router);

  loadShoppingList$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrievedShoppingList),
      mergeMap(() => {
        return this._apiService$.getShoppingList().pipe(
          map((data) => {
            return retrievedShoppingListActionSuccess({ shopping: data });
          })
        );
      }),
      catchError((error: any) => {
        return [retrievedShoppingListActionError({ error })];
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
}
