import { ReportState } from './report.selectors';
import {
  retrieveExpiredInventoryReportDataSuccess,
  retrieveInventoryReportDataSuccess,
  retrieveLastUsedReportDataSuccess,
  retrieveNexDaysExpiredDataSuccess,
  retrieveProductAvailabilityDataSuccess,
  retrieveStorageValueHistoryDataSuccess,
} from './report.action';

export const initialReportState: ReportState = {
  expired: [],
  inventory: [],
  lastUsed: [],
  productPrediction: [],
  availabilityData: [],
  nextDaysExpired: [],
  valueHistoryData: [],
};

export function reportReducer(
  state = initialReportState,
  action: any
): ReportState {
  switch (action.type) {
    case retrieveInventoryReportDataSuccess.type:
      return { ...state, expired: action.inventory };
    case retrieveExpiredInventoryReportDataSuccess.type:
      return { ...state, expired: action.expired };
    case retrieveLastUsedReportDataSuccess.type:
      return { ...state, lastUsed: action.lastUsed };
    case retrieveProductAvailabilityDataSuccess.type:
      return { ...state, availabilityData: action.availability };
    case retrieveNexDaysExpiredDataSuccess.type:
      return { ...state, nextDaysExpired: action.nextDaysExpired };
    case retrieveStorageValueHistoryDataSuccess.type:
      return { ...state, valueHistoryData: action.storageValueHistory };
    default:
      return state;
  }
}
