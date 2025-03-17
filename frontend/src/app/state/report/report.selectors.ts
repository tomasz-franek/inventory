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
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '../../../features';

export interface ReportState {
  expired: ExpiredReportData[];
  inventory: InventoryReportData[];
  lastUsed: LastUsedData[];
  productPrediction: ProductPredictionData[];
  filteredProductPredictions: ProductPredictionData[];
  productPredictionDays: number;
  availabilityData: ProductAvailabilityData[];
  nextDaysExpired: NextDayExpiredData[];
  valueHistoryData: StorageValueHistoryData[];
  priceHistoryData: ProductPriceHistoryData[];
  sumPriceCategoryData: PriceCategoryData[];
  purchasesData: PurchasesData[];
  validInventory: StorageReportDataRow[];
  selectedValidInventory: StorageReportDataRow[];
  selectedProductId: number;
  selectedCategoryId: number;
  blob: Blob | null;
}

const selectReportFutureState = createFeatureSelector<ReportState>(
  Features.reports
);

export const getExpiredProductList = createSelector(
  selectReportFutureState,
  (state) => state.expired
);

export const getLastUsedList = createSelector(
  selectReportFutureState,
  (state) => state.lastUsed
);

export const getInventoryReportProductList = createSelector(
  selectReportFutureState,
  (state) => state.inventory
);

export const getProductPredictionList = createSelector(
  selectReportFutureState,
  (state) => state.productPrediction
);

export const getFilteredProductPredictionList = createSelector(
  selectReportFutureState,
  (state) => state.filteredProductPredictions
);

export const getProductAvailabilityList = createSelector(
  selectReportFutureState,
  (state) => state.availabilityData
);

export const getNextDaysExpiredList = createSelector(
  selectReportFutureState,
  (state) => state.nextDaysExpired
);

export const getValueHistoryList = createSelector(
  selectReportFutureState,
  (state) => state.valueHistoryData
);

export const getProductHistoryData = createSelector(
  selectReportFutureState,
  (state) => state.priceHistoryData
);

export const getSumPriceCategoryData = createSelector(
  selectReportFutureState,
  (state) => state.sumPriceCategoryData
);

export const getPurchasesData = createSelector(
  selectReportFutureState,
  (state) => state.purchasesData
);
export const getValidInventory = createSelector(
  selectReportFutureState,
  (state) => state.validInventory
);

export const getSelectedValidInventory = createSelector(
  selectReportFutureState,
  (state) => state.selectedValidInventory
);

export const getBlob = createSelector(
  selectReportFutureState,
  (state) => state.blob
);
