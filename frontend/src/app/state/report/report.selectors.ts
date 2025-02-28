import { ExpiredReportData, InventoryReportData } from '../../api';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '../../../features';

export interface ReportState {
  expired: ExpiredReportData[];
  inventory: InventoryReportData[];
}

const selectReportFutureState = createFeatureSelector<ReportState>(
  Features.reports
);

export const getExpiredProductList = createSelector(
  selectReportFutureState,
  (state) => state.expired
);

export const getInventoryReportProductList = createSelector(
  selectReportFutureState,
  (state) => state.inventory
);
