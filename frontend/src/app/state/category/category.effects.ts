import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  retrievedCategoryList,
  retrievedCategoryListActionError,
  retrievedCategoryListActionSuccess,
  saveCategory,
  saveCategoryActionError,
  saveCategoryActionSuccess,
} from './category.action';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  Observable,
  withLatestFrom,
} from 'rxjs';
import { Category } from '../../api';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';

@Injectable()
export class CategoryEffects {
  private store$ = inject(Store);
  private _apiService$ = inject(ApiService);

  save$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(saveCategory),
      mergeMap((action) => {
        const category = Object.assign({}, action.category);
        return this._getCreateOrUpdateObservable(category).pipe(
          concatMap(() => {
            return [saveCategoryActionSuccess];
          }),
          catchError((error: any) => {
            return [saveCategoryActionError({ error })];
          })
        );
      })
    )
  );

  loadCategories$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrievedCategoryList),
      withLatestFrom(this.store$.select(retrievedCategoryList)),
      mergeMap(() => {
        return this._apiService$.getCategories().pipe(
          map((data) => {
            return retrievedCategoryListActionSuccess({ categories: data });
          })
        );
      }),
      catchError((error: any) => {
        return [retrievedCategoryListActionError({ error })];
      })
    )
  );

  private _getCreateOrUpdateObservable(category: Category): Observable<any> {
    if (category.idCategory !== undefined) {
      return this._apiService$.updateCategory(category.idCategory, category);
    }
    category.optLock = category.optLock || 0;
    return this._apiService$.createCategory(category);
  }
}
