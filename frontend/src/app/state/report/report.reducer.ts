import { ReportState } from './report.selectors';
import {
  retrieveExpiredInventoryReportDataSuccess,
  retrieveInventoryReportDataSuccess,
  retrieveLastUsedReportDataSuccess,
  retrieveListPurchasesSuccess,
  retrieveNexDaysExpiredDataSuccess,
  retrieveProductAvailabilityDataSuccess,
  retrieveProductPriceHistoryDataSuccess,
  retrieveStorageValueHistoryDataSuccess,
  retrieveSumPricesByCategoryDataSuccess,
  retrieveValidInventorySuccess,
} from './report.action';

export const initialReportState: ReportState = {
  expired: [],
  inventory: [],
  lastUsed: [],
  productPrediction: [],
  availabilityData: [],
  nextDaysExpired: [],
  valueHistoryData: [],
  priceHistoryData: [],
  sumPriceCategoryData: [],
  purchasesData: [],
  validInventory: [],
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
    case retrieveProductPriceHistoryDataSuccess.type:
      return { ...state, priceHistoryData: action.priceHistoryData };
    case retrieveSumPricesByCategoryDataSuccess.type:
      return { ...state, sumPriceCategoryData: action.sumPriceCategoryData };
    case retrieveListPurchasesSuccess.type:
      return { ...state, purchasesData: action.purchasesData };
    case retrieveValidInventorySuccess.type:
      return { ...state, validInventory: action.validInventory };
    default:
      return state;
  }
}
