import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs';
import {
  retrieveUnitList,
  retrieveUnitListActionError,
  retrieveUnitListActionSuccess,
} from './unit.action';

@Injectable()
export class UnitEffects {
  private store$ = inject(Store);
  private _apiService$: ApiService = inject(ApiService);

  loadUnits$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(retrieveUnitList),
      mergeMap(() => {
        return this._apiService$.getUnits().pipe(
          map((data) => {
            return retrieveUnitListActionSuccess({
              units: data,
            });
          })
        );
      }),
      catchError((error: any) => {
        return [retrieveUnitListActionError({ error })];
      })
    );
  });
}
