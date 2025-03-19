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
    lastUsed: [],
    selectedCategoryId: 3,
    availabilityData: [],
    filteredProductPredictions: [],
    nextDaysExpired: [],
    priceHistoryData: [],
    productPrediction: [],
    purchasesData: [],
    productPredictionDays: 3,
    selectedProductId: 33,
    selectedValidInventory: [],
    valueHistoryData: [],
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
