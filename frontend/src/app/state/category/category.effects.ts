import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadCategoryAction,
  navigateToCategoryEdit,
  navigateToCategoryList,
  navigateToCategoryNew,
  retrieveCategoryList,
  retrievedCategoryActionSuccess,
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
  tap,
  withLatestFrom,
} from 'rxjs';
import { Category } from '../../api';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Injectable()
export class CategoryEffects {
  private store$ = inject(Store);
  private _apiService$: ApiService = inject(ApiService);
  private router: Router = inject(Router);

  save$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(saveCategory),
      mergeMap((action) => {
        const category = Object.assign({}, action.category);
        return this._getCreateOrUpdateObservable(category).pipe(
          concatMap(() => {
            return [saveCategoryActionSuccess(), navigateToCategoryList()];
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
      ofType(retrieveCategoryList),
      withLatestFrom(this.store$.select(retrieveCategoryList)),
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

  loadCategory$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(loadCategoryAction),
      mergeMap((action) =>
        this._apiService$.getCategory(action.id).pipe(
          map((category) => {
            return retrievedCategoryActionSuccess({
              category: category,
            });
          })
        )
      )
    );
  });

  openCategoryList$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToCategoryList),
        tap(() => {
          this.router.navigate(['/categories']);
        })
      );
    },
    { dispatch: false }
  );

  newCategory$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToCategoryNew),
        tap(() => {
          this.router.navigate(['/category-add']);
        })
      );
    },
    { dispatch: false }
  );

  editCategory$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToCategoryEdit),
        tap((action) => {
          this.router.navigate(['/category-add', action.category.idCategory]);
        })
      );
    },
    { dispatch: false }
  );

  private _getCreateOrUpdateObservable(category: Category): Observable<any> {
    if (category.idCategory !== undefined) {
      return this._apiService$.updateCategory(category.idCategory, category);
    }
    category.optLock = category.optLock || 0;
    return this._apiService$.createCategory(category);
  }
}
