import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ExpiredReportData,
  InventoryReportData,
  LastUsedData,
  NextDayExpiredData,
  PriceCategoryData,
  ProductAvailabilityData,
  ProductPredictionData,
  ProductPriceHistoryData,
  PurchasesData,
  StorageReportDataRow,
  StorageValueHistoryData,
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

export const retrieveNexDaysExpiredData = createAction(
  '[Report] Retrieve Nex DaysExpired Data',
  props<{ days: number }>()
);

export const retrieveNexDaysExpiredDataSuccess = createAction(
  '[Report] Retrieve Nex DaysExpired Data Success',
  props<{ nextDaysExpired: NextDayExpiredData[] }>()
);

export const retrieveStorageValueHistory = createAction(
  '[Report] Retrieve Storage Value History',
  props<{ days: number }>()
);

export const retrieveStorageValueHistoryDataSuccess = createAction(
  '[Report] Retrieve Storage Value History Success',
  props<{ valueHistoryData: StorageValueHistoryData[] }>()
);

export const retrieveProductPriceHistory = createAction(
  '[Report] Retrieve Product Price History',
  props<{ idProduct: number }>()
);

export const retrieveProductPriceHistoryDataSuccess = createAction(
  '[Report] Retrieve Storage Value History Success',
  props<{ priceHistoryData: ProductPriceHistoryData[] }>()
);
export const retrieveSumPricesByCategory = createAction(
  '[Report] Retrieve Sum Prices History'
);

export const retrieveSumPricesByCategoryDataSuccess = createAction(
  '[Report] Retrieve Sum Prices History Success',
  props<{ sumPriceCategoryData: PriceCategoryData[] }>()
);
export const retrieveListPurchases = createAction(
  '[Report] Retrieve Last Purchases',
  props<{ days: number; idInventory: number }>()
);

export const retrieveListPurchasesSuccess = createAction(
  '[Report] Retrieve Last Purchases Success',
  props<{ purchasesData: PurchasesData[] }>()
);

export const retrieveValidInventorySuccess = createAction(
  '[Report] Retrieve Valid Inventory Success',
  props<{ validInventory: StorageReportDataRow[] }>()
);

export const retrieveValidInventoryData = createAction(
  '[Report] Retrieve Valid Inventory Data'
);
