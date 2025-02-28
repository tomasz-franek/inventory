import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs';
import {
  retrieveExpiredInventoryReportData,
  retrieveExpiredInventoryReportDataSuccess,
  retrieveInventoryReportData,
  retrieveInventoryReportDataSuccess,
  retrieveLastUsedReportData,
  retrieveLastUsedReportDataSuccess,
  retrieveReportDataError,
} from './report.action';

@Injectable()
export class ReportEffects {
  private store$ = inject(Store);
  private _apiService$: ApiService = inject(ApiService);
  private router: Router = inject(Router);

  loadInventoryReportData$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrieveInventoryReportData),
      mergeMap((action) => {
        return this._apiService$
          .getInventoryReportData(action.idInventory)
          .pipe(
            map((data) => {
              return retrieveInventoryReportDataSuccess({ inventory: data });
            })
          );
      }),
      catchError((error: any) => {
        return [retrieveReportDataError({ error })];
      })
    )
  );

  loadExpiredInventoryReportData$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrieveExpiredInventoryReportData),
      mergeMap((action) => {
        return this._apiService$
          .getExpiredInventoryReportData(action.idInventory)
          .pipe(
            map((data) => {
              return retrieveExpiredInventoryReportDataSuccess({
                expired: data,
              });
            })
          );
      }),
      catchError((error: any) => {
        return [retrieveReportDataError({ error })];
      })
    )
  );

  loadLastUsedReportData$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrieveLastUsedReportData),
      mergeMap((action) => {
        return this._apiService$
          .getLastUsedInventoryReportData(action.idInventory)
          .pipe(
            map((data) => {
              return retrieveLastUsedReportDataSuccess({
                lastUsed: data,
              });
            })
          );
      }),
      catchError((error: any) => {
        return [retrieveReportDataError({ error })];
      })
    )
  );
}
