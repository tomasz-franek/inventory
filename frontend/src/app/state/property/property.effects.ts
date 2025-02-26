import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  retrievedPropertyForUser,
  retrievedPropertyForUserActionError,
  retrievedPropertyForUserActionSuccess,
  saveProperty,
  savePropertyActionError,
  savePropertySuccess,
} from './property.action';
import { catchError, concatMap, map, mergeMap, Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Property } from '../../api';

@Injectable()
export class PropertyEffects {
  private _actions$: Actions = inject(Actions);
  private _apiService$: ApiService = inject(ApiService);

  loadProperty$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(retrievedPropertyForUser),
      mergeMap((action: any) => {
        return this._apiService$.getProperty(action.idUser).pipe(
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

  saveProperty$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(saveProperty),
      mergeMap((action) => {
        const property = Object.assign({}, action.property);
        return this._getCreateOrUpdateObservable(property).pipe(
          concatMap(() => {
            return [savePropertySuccess()];
          }),
          catchError((error: any) => {
            return [savePropertyActionError({ error })];
          })
        );
      })
    );
  });

  private _getCreateOrUpdateObservable(property: Property): Observable<any> {
    if (property.idProperty !== undefined) {
      return this._apiService$.updateProperty(property);
    }
    return this._apiService$.createProperty(property);
  }
}
