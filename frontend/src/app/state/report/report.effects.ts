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
  retrieveListPurchases,
  retrieveListPurchasesSuccess,
  retrieveNexDaysExpiredData,
  retrieveNexDaysExpiredDataSuccess,
  retrieveProductAvailabilityDataSuccess,
  retrieveProductPredictionData,
  retrieveProductPredictionDataSuccess,
  retrieveProductPriceHistory,
  retrieveProductPriceHistoryDataSuccess,
  retrieveReportDataError,
  retrieveStorageValueHistory,
  retrieveStorageValueHistoryDataSuccess,
  retrieveSumPricesByCategory,
  retrieveSumPricesByCategoryDataSuccess,
  retrieveValidInventoryData,
  retrieveValidInventorySuccess,
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
  loadNextDaysExpiredData$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrieveNexDaysExpiredData),
      mergeMap((action) => {
        return this._apiService$.getNextDaysExpired(action.days).pipe(
          map((data) => {
            return retrieveNexDaysExpiredDataSuccess({
              nextDaysExpired: data,
            });
          })
        );
      }),
      catchError((error: any) => {
        return [retrieveReportDataError({ error })];
      })
    )
  );
  loadStorageValueHistory$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrieveStorageValueHistory),
      mergeMap((action) => {
        return this._apiService$.getStorageValueHistory(action.days).pipe(
          map((data) => {
            return retrieveStorageValueHistoryDataSuccess({
              valueHistoryData: data,
            });
          })
        );
      }),
      catchError((error: any) => {
        return [retrieveReportDataError({ error })];
      })
    )
  );

  loadProductPriceHistory$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrieveProductPriceHistory),
      mergeMap((action) => {
        return this._apiService$.getProductPriceHistory(action.idProduct).pipe(
          map((data) => {
            return retrieveProductPriceHistoryDataSuccess({
              priceHistoryData: data,
            });
          })
        );
      }),
      catchError((error: any) => {
        return [retrieveReportDataError({ error })];
      })
    )
  );

  loadSumPricesByCategory$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrieveSumPricesByCategory),
      mergeMap(() => {
        return this._apiService$.getSumPricesByCategory().pipe(
          map((data) => {
            return retrieveSumPricesByCategoryDataSuccess({
              sumPriceCategoryData: data,
            });
          })
        );
      }),
      catchError((error: any) => {
        return [retrieveReportDataError({ error })];
      })
    )
  );

  loadListPurchases$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrieveListPurchases),
      mergeMap((action) => {
        return this._apiService$
          .getListRecentPurchases(action.days, action.idInventory)
          .pipe(
            map((data) => {
              return retrieveListPurchasesSuccess({
                purchasesData: data,
              });
            })
          );
      }),
      catchError((error: any) => {
        return [retrieveReportDataError({ error })];
      })
    )
  );

  loadValidInventoryData$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(retrieveValidInventoryData),
      mergeMap((action) => {
        return this._apiService$.getValidInventoryReport().pipe(
          map((data) => {
            return retrieveValidInventorySuccess({
              validInventory: data,
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
