import { ReportState } from './report.selectors';
import { createReducer, on } from '@ngrx/store';
import {
  filterProductPrediction,
  reportPdfDownloadSuccess,
  retrieveExpiredInventoryReportDataSuccess,
  retrieveInventoryReportDataSuccess,
  retrieveLastUsedReportDataSuccess,
  retrieveListPurchasesSuccess,
  retrieveNexDaysExpiredDataSuccess,
  retrieveProductAvailabilityDataSuccess,
  retrieveProductPredictionDataSuccess,
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
  filteredProductPredictions: [],
  productPredictionDays: 60,
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
  blob: null,
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
  on(retrieveProductPredictionDataSuccess, (state, action): ReportState => {
    return { ...state, productPrediction: action.productPrediction };
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
  on(filterProductPrediction, (state, action): ReportState => {
    let maxEpoch = new Date().getTime() + action.days * 24 * 26 * 60;
    return {
      ...state,
      productPredictionDays: action.days,
      filteredProductPredictions: state.productPrediction.filter(
        (productPrediction) =>
          productPrediction.predictedAvailabilityEpoch ||
          maxEpoch + 1 < maxEpoch
      ),
    };
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
  }),
  on(reportPdfDownloadSuccess, (state, action): ReportState => {
    return { ...state, blob: action.blob };
  })
);
