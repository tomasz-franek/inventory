import {
  ExpiredReportData,
  InventoryReportData,
  LastUsedData,
} from '../../api';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '../../../features';

export interface ReportState {
  expired: ExpiredReportData[];
  inventory: InventoryReportData[];
  lastUsed: LastUsedData[];
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
