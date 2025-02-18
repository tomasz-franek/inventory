import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  retrievedPropertyForUser,
  retrievedPropertyForUserActionError,
  retrievedPropertyForUserActionSuccess,
} from './property.action';
import { catchError, map, mergeMap } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Injectable()
export class PropertyEffects {
  private _actions$: Actions = inject(Actions);
  private _apiService: ApiService = inject(ApiService);
  loadProperty$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(retrievedPropertyForUser),
      mergeMap((action: any) => {
        return this._apiService.getProperty(action.isUser).pipe(
          map((data) => {
            return retrievedPropertyForUserActionSuccess({ property: data });
          })
        );
      }),
      catchError((error: any) => {
        return [retrievedPropertyForUserActionError({ error })];
      })
    );
  });
}
