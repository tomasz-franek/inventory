import {
  getItemsWithInventoryList,
  ItemState,
  selectConsumeProductList,
} from './item.selectors';

describe('ItemSelectors', () => {
  let initialState = {
    items: [
      {
        idItem: 1,
        name: 'testItem',
        idStorage: 2,
        endDate: undefined,
        used: 0,
      },
      {
        idItem: 2,
        name: 'testItem',
        idStorage: 4,
        endDate: undefined,
        used: 0,
      },
    ],
    itemsWithoutInventoryList: [
      { idStorage: 1, ids: [1, 2], productName: 'productName1' },
      { idStorage: 1, ids: [33, 44], productName: 'productName2' },
    ],
    consumeProductList: [
      {
        idItem: 1,
        endDate: '2029-01-01',
        idProduct: 2,
        productName: 'name2',
        used: 2,
        insertDate: '2024-04-29',
        inventoryName: 'inventoryName1',
      },
      {
        idItem: 2,
        endDate: '2029-01-01',
        idProduct: 2,
        productName: 'name2',
        used: 2,
        insertDate: '2024-04-29',
        inventoryName: 'inventoryName2',
      },
    ],
  } as ItemState;

  it('should select items', () => {
    // when
    const result = getItemsWithInventoryList.projector(initialState);

    // then
    expect(result).toEqual(initialState.itemsWithoutInventoryList);
  });

  it('should select consumeProductList', () => {
    // when
    const result = selectConsumeProductList.projector(initialState);

    // then
    expect(result).toEqual(initialState.consumeProductList);
  });
});
