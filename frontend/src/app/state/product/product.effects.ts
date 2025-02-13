import {inject, Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  retrievedProductList,
  retrievedProductListActionError,
  retrievedProductListActionSuccess,
  saveProduct,
  saveProductActionError,
  saveProductActionSuccess
} from './product.action';
import {catchError, concatMap, map, mergeMap, Observable} from 'rxjs';
import {Product} from '../../api';

@Injectable()
export class ProductEffects {
  private _actions$: Actions = inject(Actions);
  private _apiService: ApiService = inject(ApiService);

  loadProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(retrievedProductList),
      mergeMap(() => {
          return this._apiService.getProducts().pipe(map((data) => {
            return retrievedProductListActionSuccess({products: data});
          }));
        }
      ),
      catchError((error: any) => {
        return [retrievedProductListActionError({error})];
      })
    );
  });

  save$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(saveProduct),
      mergeMap((action) => {
        const product = Object.assign({}, action.product);
        return this._getCreateOrUpdateObservable(product).pipe(
          concatMap(() => {
            return [saveProductActionSuccess];
          }),
          catchError((error: any) => {
            return [saveProductActionError({error})];
          })
        );
      })
    );
  });

  private _getCreateOrUpdateObservable(product: Product): Observable<any> {
    if (product.id !== null && product.id !== undefined) {
      return this._apiService.updateProduct(product.id, product);
    }
    product.optLock = product.optLock || 0;
    return this._apiService.createProduct(product);
  }
}

