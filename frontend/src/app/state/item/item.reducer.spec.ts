import { ItemState } from './item.selectors';
import { itemReducer } from './item.reducer';
import {
  retrievedConsumeProductListActionSuccess,
  retrievedItemsWithoutInventoryListActionSuccess,
} from './item.action';
import { ConsumeProduct, StorageItem } from '../../api';

describe('ItemReducer', () => {
  const mockInitialState = (): ItemState => {
    return {
      items: [
        {
          idItem: 1,
          ids: [1, 2],
          name: 'e',
          idInventory: 2,
          used: 4,
          insertDate: '',
          idStorage: 3,
          optLock: 3,
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
      ],
    } as ItemState;
  };
  describe('unknown action', () => {
    it('should return the default state', () => {
      // given
      const initialState = mockInitialState();
      const action = {
        type: 'Unknown',
      };

      // when
      const state = itemReducer(initialState, action);

      // then
      expect(state).toEqual(initialState);
    });
  });
  describe('retrievedItemsWithoutInventoryListActionSuccess', () => {
    it('should set itemsWithoutInventoryList', () => {
      // given
      const initialState = mockInitialState();
      initialState.itemsWithoutInventoryList = [
        {
          idStorage: 32,
          ids: [1, 2, 3],
          productName: 'testProduct',
          validDate: '2025-01-01',
        },
      ];
      const itemsWithoutInventoryList = [
        {
          idStorage: 32,
          ids: [1, 2, 3],
          productName: 'testProduct',
          validDate: '2025-01-01',
        },
      ] as StorageItem[];
      const action = retrievedItemsWithoutInventoryListActionSuccess({
        itemsWithoutInventoryList,
      });

      // when
      const state = itemReducer(initialState, action);

      // then
      expect(state.itemsWithoutInventoryList).toEqual(
        itemsWithoutInventoryList
      );
    });
  });
  describe('retrievedConsumeProductListActionSuccess', () => {
    it('should set consumeProductList', () => {
      // given
      let initialState = mockInitialState();
      initialState.consumeProductList = [];
      const consumeProductList = [
        {
          idItem: 2,
          idProduct: 3,
          endDate: '2025-01-01',
          insertDate: '2025-01-01',
          inventoryName: 'test',
          used: 0,
          price: 0,
          productName: 'testProduct',
          validDate: '2025-01-01',
        },
      ] as ConsumeProduct[];
      const action = retrievedConsumeProductListActionSuccess({
        consumeProductList: consumeProductList,
      });

      // when
      const state = itemReducer(initialState, action);

      // then
      expect(state.consumeProductList).toEqual(consumeProductList);
    });
  });
});
