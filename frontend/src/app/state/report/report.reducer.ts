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
    case setReportCategoryId.type:
      return { ...state, selectedCategoryId: action.idCategory };
    case setReportProductId.type:
      return { ...state, selectedProductId: action.idProduct };
    case selectValidInventoryByCategoryAndProduct.type:
      console.log(state);
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
    default:
      return state;
  }
}
