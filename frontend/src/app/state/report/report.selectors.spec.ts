import {
  getBlob,
  getSelectedValidInventory,
  getValidInventory,
  ReportState,
} from './report.selectors';

describe('ReportSelectors', () => {
  let initialState = {
    expired: [],
    blob: null,
    validInventory: [],
    inventory: [],
    lastUsed: [{ idProduct: 2, productName: 'a', endDate: '3' }],
    selectedCategoryId: 3,
    availabilityData: [
      {
        productName: 'xx',
        availabilityDate: 'ed',
        count: 4,
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
    nextDaysExpired: [
      {
        idProduct: 1,
        productName: '',
        inventoryName: '',
        validDate: '',
        used: 1,
      },
    ],
    priceHistoryData: [
      {
        price: 44,
        operationDate: '',
      },
    ],
    productPrediction: [],
    purchasesData: [],
    productPredictionDays: 3,
    selectedProductId: 33,
    selectedValidInventory: [],
    valueHistoryData: [
      {
        price: 44,
        idItem: 44,
        operationDate: '444',
      },
    ],
    sumPriceCategoryData: [],
  } as ReportState;

  it('should select selectedValidInventory', () => {
    initialState.selectedValidInventory = [
      {
        idCategory: 2,
        validList: [],
        idProduct: 3,
        productName: 'product 1',
      },
    ];
    // when
    const result = getSelectedValidInventory.projector(initialState);

    // then
    expect(result).toEqual(initialState.selectedValidInventory);
  });
  it('should select blob', () => {
    initialState.blob = new Blob([]);
    // when
    const result = getBlob.projector(initialState);

    // then
    expect(result).toEqual(initialState.blob);
  });
  it('should select validInventory', () => {
    initialState.validInventory = [
      {
        productName: 'product',
        idCategory: 3,
        idProduct: 4,
        validList: [],
      },
    ];
    // when
    const result = getValidInventory.projector(initialState);

    // then
    expect(result).toEqual(initialState.validInventory);
  });
});
