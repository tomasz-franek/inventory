import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../services/api.service';
import {
  retrievedStorageList,
  retrievedStorageListActionError,
  retrievedStorageListActionSuccess,
  saveStorage,
  saveStorageActionError,
  saveStorageActionSuccess
} from './storage.action';
import {catchError, concatMap, map, mergeMap, Observable} from 'rxjs';
import {Storage} from '../../api';

@Injectable()
export class StorageEffects {
  private _actions$: Actions = inject(Actions);
  save$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(saveStorage),
      mergeMap((action) => {
        const storage = Object.assign({}, action.storage);
        return this._getCreateOrUpdateObservable(storage).pipe(
          concatMap(() => {
            return [saveStorageActionSuccess];
          }),
          catchError((error: any) => {
            return [saveStorageActionError({error})];
          })
        );
      })
    );
  });
  private _apiService: ApiService = inject(ApiService);
  loadStorages$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(retrievedStorageList),
      mergeMap(() => {
          return this._apiService.getStorages().pipe(map((data) => {
            return retrievedStorageListActionSuccess({storages: data});
          }));
        }
      ),
      catchError((error: any) => {
        return [retrievedStorageListActionError({error})];
      })
    );
  });

  private _getCreateOrUpdateObservable(storage: Storage): Observable<any> {
    if (storage.idStorage !== null && storage.idStorage !== undefined) {
      return this._apiService.updateStorage(storage.idStorage, storage);
    }
    storage.optLock = storage.optLock || 0;
    return this._apiService.createStorage(storage);
  }
}

