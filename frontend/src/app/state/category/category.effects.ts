import {inject, Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  retrievedCategoryList,
  retrievedCategoryListActionError,
  retrievedCategoryListActionSuccess,
  saveCategory,
  saveCategoryActionError,
  saveCategoryActionSuccess
} from './category.action';
import {catchError, concatMap, map, mergeMap, Observable} from 'rxjs';
import {Category} from '../../api';

@Injectable()
export class CategoryEffects {
  private _actions$: Actions = inject(Actions);
  private _apiService: ApiService = inject(ApiService);

  loadCategories$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(retrievedCategoryList),
      mergeMap(() => {
          return this._apiService.getCategories().pipe(map((data) => {
            return retrievedCategoryListActionSuccess({categories: data});
          }));
        }
      ),
      catchError((error: any) => {
        return [retrievedCategoryListActionError({error})];
      })
    );
  });

  save$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(saveCategory),
      mergeMap((action) => {
        const category = Object.assign({}, action.category);
        return this._getCreateOrUpdateObservable(category).pipe(
          concatMap(() => {
            return [saveCategoryActionSuccess];
          }),
          catchError((error: any) => {
            return [saveCategoryActionError({error})];
          })
        );
      })
    );
  });

  private _getCreateOrUpdateObservable(category: Category): Observable<any> {
    if (category.id !== null && category.id !== undefined) {
      return this._apiService.updateCategory(category.id, category);
    }
    category.optLock = category.optLock || 0;
    return this._apiService.createCategory(category);
  }
}

