import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs';
import {
  retrieveExpiredInventoryReportData,
  retrieveExpiredInventoryReportDataError,
  retrieveExpiredInventoryReportDataSuccess,
  retrieveInventoryReportData,
  retrieveInventoryReportDataError,
  retrieveInventoryReportDataSuccess,
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
        return [retrieveInventoryReportDataError({ error })];
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
        return [retrieveExpiredInventoryReportDataError({ error })];
      })
    )
  );
}
