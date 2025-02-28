import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs';
import {
  readProductAvailabilityForPeriod,
  retrieveExpiredInventoryReportData,
  retrieveExpiredInventoryReportDataSuccess,
  retrieveInventoryReportData,
  retrieveInventoryReportDataSuccess,
  retrieveLastUsedReportData,
  retrieveLastUsedReportDataSuccess,
  retrieveProductAvailabilityDataSuccess,
  retrieveProductPredictionData,
  retrieveProductPredictionDataSuccess,
  retrieveReportDataError,
} from './report.action';

@Injectable()
export class ReportEffects {
  private _apiService$: ApiService = inject(ApiService);

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

  loadStoragePrediction$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrieveProductPredictionData),
      mergeMap(() => {
        return this._apiService$.getStoragePrediction().pipe(
          map((data) => {
            return retrieveProductPredictionDataSuccess({
              productPrediction: data,
            });
          })
        );
      }),
      catchError((error: any) => {
        return [retrieveReportDataError({ error })];
      })
    )
  );

  loadAvailabilityForProduct$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(readProductAvailabilityForPeriod),
      mergeMap((action) => {
        return this._apiService$
          .getProductAvailabilityForPeriod(action.idProduct, action.period)
          .pipe(
            map((data) => {
              return retrieveProductAvailabilityDataSuccess({
                availability: data,
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
