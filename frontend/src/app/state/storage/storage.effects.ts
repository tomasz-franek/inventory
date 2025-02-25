import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import {
  navigateToStorageEdit,
  navigateToStorageList,
  navigateToStorageNew,
  retrievedStorageList,
  retrievedStorageListActionError,
  retrievedStorageListActionSuccess,
  saveStorage,
  saveStorageActionError,
  saveStorageActionSuccess,
} from './storage.action';
import { catchError, concatMap, map, mergeMap, Observable, tap } from 'rxjs';
import { Storage } from '../../api';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class StorageEffects {
  private store$ = inject(Store);
  private _apiService$: ApiService = inject(ApiService);
  private router: Router = inject(Router);

  save$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(saveStorage),
      mergeMap((action) => {
        const storage = Object.assign({}, action.storage);
        return this._getCreateOrUpdateObservable(storage).pipe(
          concatMap(() => {
            return [saveStorageActionSuccess];
          }),
          catchError((error: any) => {
            return [saveStorageActionError({ error })];
          })
        );
      })
    );
  });

  newStorage$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToStorageNew),
        tap(() => {
          this.router.navigate(['/storages-add']);
        })
      );
    },
    { dispatch: false }
  );

  editStorage$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToStorageEdit),
        tap((action) => {
          this.router.navigate(['/storages-add', action.storage.idStorage]);
        })
      );
    },
    { dispatch: false }
  );

  openStorageList$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(navigateToStorageList),
        tap(() => {
          this.router.navigate(['/storages']);
        })
      );
    },
    { dispatch: false }
  );

  loadStorages$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(retrievedStorageList),
      mergeMap(() => {
        return this._apiService$.getStorages().pipe(
          map((data) => {
            return retrievedStorageListActionSuccess({
              storages: data,
            });
          })
        );
      }),
      catchError((error: any) => {
        return [retrievedStorageListActionError({ error })];
      })
    );
  });

  private _getCreateOrUpdateObservable(storage: Storage): Observable<any> {
    if (storage.idStorage !== null && storage.idStorage !== undefined) {
      return this._apiService$.updateStorage(storage.idStorage, storage);
    }
    storage.optLock = storage.optLock || 0;
    return this._apiService$.createStorage(storage);
  }
}
