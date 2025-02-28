import { ReportState } from './report.selectors';
import {
  retrieveExpiredInventoryReportDataSuccess,
  retrieveInventoryReportDataSuccess,
  retrieveLastUsedReportDataSuccess,
} from './report.action';

export const initialReportState: ReportState = {
  expired: [],
  inventory: [],
  lastUsed: [],
  productPrediction: [],
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
    default:
      return state;
  }
}
