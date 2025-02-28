import { ReportState } from './report.selectors';
import {
  retrieveExpiredInventoryReportDataSuccess,
  retrieveInventoryReportDataSuccess,
} from './report.action';

export const initialReportState: ReportState = {
  expired: [],
  inventory: [],
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
    default:
      return state;
  }
}
