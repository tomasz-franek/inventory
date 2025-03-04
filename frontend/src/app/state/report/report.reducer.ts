import { ReportState } from './report.selectors';
import { createReducer, on } from '@ngrx/store';
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
  selectValidInventoryByCategoryAndProduct,
  setReportCategoryId,
  setReportProductId,
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
  selectedValidInventory: [],
  selectedProductId: 0,
  selectedCategoryId: 0,
};

export const reportReducer = createReducer(
  initialReportState,
  on(retrieveInventoryReportDataSuccess, (state, action): ReportState => {
    return { ...state, expired: action.inventory };
  }),
  on(
    retrieveExpiredInventoryReportDataSuccess,
    (state, action): ReportState => {
      return { ...state, expired: action.expired };
    }
  ),
  on(retrieveLastUsedReportDataSuccess, (state, action): ReportState => {
    return { ...state, lastUsed: action.lastUsed };
  }),
  on(retrieveProductAvailabilityDataSuccess, (state, action): ReportState => {
    return { ...state, availabilityData: action.availability };
  }),
  on(retrieveNexDaysExpiredDataSuccess, (state, action): ReportState => {
    return { ...state, nextDaysExpired: action.nextDaysExpired };
  }),
  on(retrieveStorageValueHistoryDataSuccess, (state, action): ReportState => {
    return { ...state, valueHistoryData: action.valueHistoryData };
  }),
  on(retrieveProductPriceHistoryDataSuccess, (state, action): ReportState => {
    return { ...state, priceHistoryData: action.priceHistoryData };
  }),
  on(retrieveSumPricesByCategoryDataSuccess, (state, action): ReportState => {
    return { ...state, sumPriceCategoryData: action.sumPriceCategoryData };
  }),
  on(retrieveListPurchasesSuccess, (state, action): ReportState => {
    return { ...state, purchasesData: action.purchasesData };
  }),
  on(retrieveValidInventorySuccess, (state, action): ReportState => {
    return { ...state, validInventory: action.validInventory };
  }),
  on(setReportCategoryId, (state, action): ReportState => {
    return { ...state, selectedCategoryId: action.idCategory };
  }),
  on(setReportProductId, (state, action): ReportState => {
    return { ...state, selectedProductId: action.idProduct };
  }),
  on(selectValidInventoryByCategoryAndProduct, (state, action): ReportState => {
    return {
      ...state,
      selectedValidInventory: state.validInventory.filter(
        (storage) =>
          (state.selectedCategoryId > 0
            ? storage.idCategory == state.selectedCategoryId
            : true) &&
          (state.selectedProductId > 0
            ? storage.idProduct == state.selectedProductId
            : true)
      ),
    };
  })
);
