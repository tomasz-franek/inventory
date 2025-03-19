import { ReportState } from './report.selectors';
import { reportReducer } from './report.reducer';
import { ExpiredReportData } from '../../api';
import { retrieveExpiredInventoryReportDataSuccess } from './report.action';

describe('ReportReducer', () => {
  const mockInitialState = (): ReportState => {
    return {
      expired: [],
      inventory: [],
      lastUsed: [],
      productPrediction: [],
      filteredProductPredictions: [],
      productPredictionDays: 22,
      availabilityData: [],
      nextDaysExpired: [],
      valueHistoryData: [],
      priceHistoryData: [],
      sumPriceCategoryData: [],
      purchasesData: [],
      validInventory: [],
      selectedValidInventory: [],
      selectedProductId: 2,
      selectedCategoryId: 2,
      blob: null,
    } as ReportState;
  };
  describe('unknown action', () => {
    it('should return the default state', () => {
      // given
      const initialState = mockInitialState();
      const action = {
        type: 'Unknown',
      };

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state).toEqual(initialState);
    });
  });
  describe('retrieveExpiredInventoryReportDataSuccess', () => {
    it('should set expired', () => {
      // given
      const initialState = mockInitialState();
      initialState.expired = [];
      const expired = [
        {
          idProduct: 3,
          items: 3,
          productName: 'Test',
          validDate: '2022-03-03',
          validList: [],
        },
      ] as ExpiredReportData[];
      const action = retrieveExpiredInventoryReportDataSuccess({ expired });

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.expired).toEqual(expired);
    });
  });
});
