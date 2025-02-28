import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ExpiredReportData,
  InventoryReportData,
  LastUsedData,
  ProductAvailabilityData,
  ProductPredictionData,
} from '../../api';

export const retrieveInventoryReportData = createAction(
  '[Report] Retrieve Inventory Report',
  props<{ idInventory: number }>()
);

export const retrieveExpiredInventoryReportData = createAction(
  '[Report] Retrieve Expired Inventory Report',
  props<{ idInventory: number }>()
);

export const retrieveExpiredInventoryReportDataSuccess = createAction(
  '[Report] Retrieve Expired Inventory Report Success',
  props<{ expired: ExpiredReportData[] }>()
);

export const retrieveInventoryReportDataSuccess = createAction(
  '[Report] Retrieve Inventory Report Success',
  props<{ inventory: InventoryReportData[] }>()
);

export const retrieveReportDataError = createAction(
  '[Report] Retrieve Inventory Report Error',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const retrieveLastUsedReportData = createAction(
  '[Report] Retrieve LastUsedReportData',
  props<{ idInventory: number }>()
);

export const retrieveLastUsedReportDataSuccess = createAction(
  '[Report] Retrieve Last UsedReport Success',
  props<{ lastUsed: LastUsedData[] }>()
);

export const retrieveProductPredictionData = createAction(
  '[Report] Retrieve Product Prediction'
);

export const retrieveProductPredictionDataSuccess = createAction(
  '[Report] Retrieve Product Prediction Data Success',
  props<{ productPrediction: ProductPredictionData[] }>()
);
export const retrieveProductAvailabilityDataSuccess = createAction(
  '[Report] Retrieve Product Availability Data Success',
  props<{ availability: ProductAvailabilityData[] }>()
);

export const readProductAvailabilityForPeriod = createAction(
  '[Report] Read Product Availability For Period',
  props<{ idProduct: number; period: number }>()
);
