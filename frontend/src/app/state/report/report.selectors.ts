import {
  ExpiredReportData,
  InventoryReportData,
  LastUsedData,
  NextDayExpiredData,
  ProductAvailabilityData,
  ProductPredictionData,
} from '../../api';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '../../../features';

export interface ReportState {
  expired: ExpiredReportData[];
  inventory: InventoryReportData[];
  lastUsed: LastUsedData[];
  productPrediction: ProductPredictionData[];
  availabilityData: ProductAvailabilityData[];
  nextDaysExpired: NextDayExpiredData[];
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

export const getProductAvailabilityList = createSelector(
  selectReportFutureState,
  (state) => state.availabilityData
);

export const getNextDaysExpiredList = createSelector(
  selectReportFutureState,
  (state) => state.nextDaysExpired
);
