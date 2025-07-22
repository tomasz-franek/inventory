import { ReportState } from './report.selectors';
import { reportReducer } from './report.reducer';
import {
  ExpiredReportData,
  LastUsedData,
  NextDayExpiredData,
  PriceCategoryData,
  ProductAvailabilityData,
  ProductPredictionData,
  ProductPriceHistoryData,
  PurchasesData,
  StorageReportDataRow,
  StorageValueHistoryData,
} from '../../api';
import {
  filterProductPrediction,
  reportPdfDownloadSuccess,
  retrieveExpiredInventoryReportDataSuccess,
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

describe('ReportReducer', () => {
  const mockInitialState = (): ReportState => {
    return {
      expired: [
        {
          idProduct: 1,
          productName: 'a',
          items: 2,
          validList: [{ validDate: '', count: 2 }],
          validDate: '22',
        },
      ],
      inventory: [{ idProduct: 2, productName: 'a', items: 2, validDate: '' }],
      lastUsed: [{ idProduct: 2, productName: 'a', endDate: '3' }],
      productPrediction: [
        {
          idProduct: 2,
          productName: 'a',
          predictedAvailabilityEpoch: 2,
          predictedAvailabilityDate: '',
          minimalProductBuyingDate: '',
          limitMin: 2,
          limitMed: 3,
          limitMax: 3,
          countUsed: 4,
          countItems: 4,
          available: 5,
        },
      ],
      filteredProductPredictions: [
        {
          idProduct: 1,
          productName: 'a',
          predictedAvailabilityEpoch: 1,
          predictedAvailabilityDate: '',
          minimalProductBuyingDate: '3',
          available: 4,
          countUsed: 5,
          countItems: 5,
          limitMax: 5,
          limitMin: 5,
          limitMed: 9,
        },
      ],
      productPredictionDays: 22,
      availabilityData: [
        {
          productName: 'xx',
          availabilityDate: 'ed',
          count: 4,
        },
      ],
      nextDaysExpired: [
        {
          idProduct: 1,
          productName: '',
          inventoryName: '',
          validDate: '',
          used: 1,
        },
      ],
      valueHistoryData: [
        {
          price: 44,
          idItem: 44,
          operationDate: '444',
        },
      ],
      priceHistoryData: [
        {
          price: 44,
          operationDate: '',
        },
      ],
      sumPriceCategoryData: [
        {
          idCategory: 44,
          categoryName: '',
          value: 44,
        },
      ],
      purchasesData: [
        {
          insertDate: '',
          productName: '',
          items: 87,
          price: 87,
          priceSum: 87,
          idStorage: 87,
        },
      ],
      validInventory: [
        {
          productName: '',
          idProduct: 87,
          idCategory: 87,
          validList: [
            {
              validDate: '',
              count: 87,
            },
          ],
        },
      ],
      selectedValidInventory: [
        {
          productName: '',
          idProduct: 87,
          idCategory: 87,
          validList: [
            {
              validDate: '',
              count: 87,
            },
          ],
        },
      ],
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
  describe('retrieveLastUsedReportDataSuccess', () => {
    it('should set lastUsed', () => {
      // given
      const initialState = mockInitialState();
      initialState.expired = [];
      const lastUsed = [
        {
          idProduct: 3,
          productName: 'Test',
          endDate: '2022-03-03',
        },
      ] as LastUsedData[];
      const action = retrieveLastUsedReportDataSuccess({ lastUsed });

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.lastUsed).toEqual(lastUsed);
    });
  });
  describe('retrieveProductAvailabilityDataSuccess', () => {
    it('should set availabilityData', () => {
      // given
      const initialState = mockInitialState();
      initialState.expired = [];
      const availability = [
        {
          count: 3,
          productName: 'Test',
          availabilityDate: '2022-03-03',
        },
      ] as ProductAvailabilityData[];
      const action = retrieveProductAvailabilityDataSuccess({ availability });

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.availabilityData).toEqual(availability);
    });
  });
  describe('retrieveProductPredictionDataSuccess', () => {
    it('should set productPrediction', () => {
      // given
      const initialState = mockInitialState();
      initialState.expired = [];
      const productPrediction = [
        {
          idProduct: 3,
          productName: 'Test',
          minimalProductBuyingDate: '2022-03-03',
          countUsed: 0,
          countItems: 0,
          available: 0,
          predictedAvailabilityDate: '2022-03-03',
          predictedAvailabilityEpoch: 3,
          limitMax: 0,
          limitMed: 0,
          limitMin: 0,
        },
      ] as ProductPredictionData[];
      const action = retrieveProductPredictionDataSuccess({
        productPrediction,
      });

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.productPrediction).toEqual(productPrediction);
    });
  });
  describe('retrieveNexDaysExpiredDataSuccess', () => {
    it('should set nextDaysExpired', () => {
      // given
      const initialState = mockInitialState();
      initialState.expired = [];
      const nextDaysExpired = [
        {
          idProduct: 3,
          productName: 'Test',
          inventoryName: 'Test',
          validDate: '2022-03-03',
          used: 0,
        },
      ] as NextDayExpiredData[];
      const action = retrieveNexDaysExpiredDataSuccess({
        nextDaysExpired,
      });

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.nextDaysExpired).toEqual(nextDaysExpired);
    });
  });
  describe('retrieveStorageValueHistoryDataSuccess', () => {
    it('should set valueHistoryData', () => {
      // given
      const initialState = mockInitialState();
      initialState.expired = [];
      const valueHistoryData = [
        {
          idItem: 3,
          operationDate: '2022-03-03',
          price: 0,
        },
      ] as StorageValueHistoryData[];
      const action = retrieveStorageValueHistoryDataSuccess({
        valueHistoryData,
      });

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.valueHistoryData).toEqual(valueHistoryData);
    });
  });
  describe('retrieveProductPriceHistoryDataSuccess', () => {
    it('should set priceHistoryData', () => {
      // given
      const initialState = mockInitialState();
      initialState.expired = [];
      const priceHistoryData = [
        {
          operationDate: '2022-03-03',
          price: 0,
        },
      ] as ProductPriceHistoryData[];
      const action = retrieveProductPriceHistoryDataSuccess({
        priceHistoryData,
      });

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.priceHistoryData).toEqual(priceHistoryData);
    });
  });
  describe('retrieveSumPricesByCategoryDataSuccess', () => {
    it('should set sumPriceCategoryData', () => {
      // given
      const initialState = mockInitialState();
      initialState.expired = [];
      const sumPriceCategoryData = [
        {
          idCategory: 1,
          categoryName: 'test',
          value: 1,
        },
      ] as PriceCategoryData[];
      const action = retrieveSumPricesByCategoryDataSuccess({
        sumPriceCategoryData,
      });

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.sumPriceCategoryData).toEqual(sumPriceCategoryData);
    });
  });
  describe('retrieveListPurchasesSuccess', () => {
    it('should set purchasesData', () => {
      // given
      const initialState = mockInitialState();
      initialState.expired = [];
      const purchasesData = [
        {
          idStorage: 1,
          productName: 'test',
          items: 1,
          price: 1,
          priceSum: 23,
        },
      ] as PurchasesData[];
      const action = retrieveListPurchasesSuccess({
        purchasesData,
      });

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.purchasesData).toEqual(purchasesData);
    });
  });
  describe('retrieveValidInventorySuccess', () => {
    it('should set validInventory', () => {
      // given
      const initialState = mockInitialState();
      initialState.expired = [];
      const validInventory = [
        {
          idProduct: 1,
          idCategory: 1,
          validList: [
            {
              validDate: '2022-03-03',
              count: 32,
            },
          ],
        },
      ] as StorageReportDataRow[];
      const action = retrieveValidInventorySuccess({
        validInventory,
      });

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.validInventory).toEqual(validInventory);
    });
  });
  describe('setReportCategoryId', () => {
    it('should set selectedCategoryId', () => {
      // given
      const initialState = mockInitialState();
      initialState.expired = [];
      const idCategory = 888;
      const action = setReportCategoryId({
        idCategory,
      });

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.selectedCategoryId).toEqual(idCategory);
    });
  });
  describe('setReportProductId', () => {
    it('should set selectedProductId', () => {
      // given
      const initialState = mockInitialState();
      initialState.expired = [];
      const idProduct = 321;
      const action = setReportProductId({
        idProduct,
      });

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.selectedProductId).toEqual(idProduct);
    });
  });
  describe('filterProductPrediction', () => {
    it('should set selectedProductId', () => {
      // given
      const initialState = mockInitialState();
      initialState.expired = [];
      const days = 29;
      initialState.productPrediction = [
        {
          idProduct: 3,
          productName: 'Test',
          minimalProductBuyingDate: '2022-03-03',
          countUsed: 0,
          countItems: 0,
          available: 0,
          predictedAvailabilityDate: '2022-03-03',
          predictedAvailabilityEpoch: 3,
          limitMax: 0,
          limitMed: 0,
          limitMin: 0,
        },
      ] as ProductPredictionData[];
      const action = filterProductPrediction({
        days,
      });

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.filteredProductPredictions).toEqual(
        initialState.productPrediction
      );
      expect(state.productPredictionDays).toEqual(days);
    });
  });
  describe('selectValidInventoryByCategoryAndProduct', () => {
    const validInventory = [
      {
        idProduct: 1,
        productName: 'a',
        idCategory: 2,
        validList: [{ validDate: '2023-01-01', count: 1 }],
      },
      {
        idProduct: 3,
        productName: 'b',
        idCategory: 4,
        validList: [{ validDate: '2023-01-01', count: 1 }],
      },
    ];
    it('should select all  validInventory when selectedProductId = 0 and selectedCategoryId = 0 ', () => {
      // given
      const initialState = mockInitialState();
      initialState.validInventory = validInventory;
      initialState.selectedProductId = 0;
      initialState.selectedCategoryId = 0;
      const action = selectValidInventoryByCategoryAndProduct();

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.selectedValidInventory.length).toEqual(2);
      expect(state.selectedValidInventory[0].idProduct).toEqual(1);
      expect(state.selectedValidInventory[1].idProduct).toEqual(3);
    });

    it('should select first row from validInventory when selectedProductId = 1 and selectedCategoryId = 0 ', () => {
      // given
      const initialState = mockInitialState();
      initialState.validInventory = validInventory;
      initialState.selectedProductId = 1;
      initialState.selectedCategoryId = 0;
      const action = selectValidInventoryByCategoryAndProduct();

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.selectedValidInventory.length).toEqual(1);
      expect(state.selectedValidInventory[0].idProduct).toEqual(1);
    });
    it('should select second row from validInventory when selectedProductId = 0 and selectedCategoryId = 4 ', () => {
      // given
      const initialState = mockInitialState();
      initialState.validInventory = validInventory;
      initialState.selectedProductId = 0;
      initialState.selectedCategoryId = 4;
      const action = selectValidInventoryByCategoryAndProduct();

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.selectedValidInventory.length).toEqual(1);
      expect(state.selectedValidInventory[0].idProduct).toEqual(3);
    });

    it('should select second row from validInventory when selectedProductId = 3 and selectedCategoryId = 4 ', () => {
      // given
      const initialState = mockInitialState();
      initialState.validInventory = validInventory;
      initialState.selectedProductId = 3;
      initialState.selectedCategoryId = 4;
      const action = selectValidInventoryByCategoryAndProduct();

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.selectedValidInventory.length).toEqual(1);
      expect(state.selectedValidInventory[0].idProduct).toEqual(3);
    });
  });
  describe('reportPdfDownloadSuccess', () => {
    it('should set selectedProductId', () => {
      // given
      const initialState = mockInitialState();
      const blob = new Blob();
      initialState.blob = blob;
      const action = reportPdfDownloadSuccess({
        blob,
      });

      // when
      const state = reportReducer(initialState, action);

      // then
      expect(state.blob).toEqual(blob);
    });
  });
});
