import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadProductAction,
  navigateToProductEdit,
  navigateToProductList,
  navigateToProductNew,
  retrievedProductActionSuccess,
  retrievedProductList,
  retrievedProductListActionError,
  retrievedProductListActionSuccess,
  saveProduct,
  saveProductActionError,
  saveProductActionSuccess,
} from './product.action';
import { catchError, concatMap, map, mergeMap, Observable, tap } from 'rxjs';
import { Product } from '../../api';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {
  private _apiService$: ApiService = inject(ApiService);
  private router: Router = inject(Router);

  loadProducts$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(retrievedProductList),
      mergeMap(() => {
        return this._apiService$.getProducts().pipe(
          map((data) => {
            return retrievedProductListActionSuccess({ products: data });
          })
        );
      }),
      catchError((error: any) => {
        return [retrievedProductListActionError({ error })];
      })
    );
  });

  save$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(saveProduct),
      mergeMap((action) => {
        const product = Object.assign({}, action.product);
        return this._getCreateOrUpdateObservable(product).pipe(
          concatMap(() => {
            return [saveProductActionSuccess(), navigateToProductList()];
          }),
          catchError((error: any) => {
            return [saveProductActionError({ error })];
          })
        );
      })
    );
  });

  loadProduct$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(loadProductAction),
      mergeMap((action) =>
        this._apiService$.getProduct(action.id).pipe(
          map((product) => {
            return retrievedProductActionSuccess({
              product: product,
            });
          })
        )
      )
    );
  });

  openProductList$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToProductList),
        tap(() => {
          this.router.navigate(['/products']);
        })
      );
    },
    { dispatch: false }
  );

  newProduct$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToProductNew),
        tap(() => {
          this.router.navigate(['/product-add']);
        })
      );
    },
    { dispatch: false }
  );

  editProduct$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToProductEdit),
        tap((action) => {
          this.router.navigate(['/product-add', action.product.idProduct]);
        })
      );
    },
    { dispatch: false }
  );

  private _getCreateOrUpdateObservable(product: Product): Observable<any> {
    if (product.idProduct !== null && product.idProduct !== undefined) {
      return this._apiService$.updateProduct(product.idProduct, product);
    }
    product.optLock = product.optLock || 0;
    return this._apiService$.createProduct(product);
  }
}
