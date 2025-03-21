import { ShoppingState } from './shopping.selectors';
import { shoppingReducer } from './shopping.reducer';
import { Shopping } from '../../api';
import {
  retrievedShoppingActionSuccess,
  retrieveShoppingListActionSuccess,
} from './shopping.action';

describe('ShoppingReducer', () => {
  const mockInitialState = (): ShoppingState => {
    return {
      shoppingList: [] as Shopping[],
      shoppingEdit: {} as Shopping,
    } as ShoppingState;
  };
  describe('unknown action', () => {
    it('should return the default state', () => {
      // given
      const initialState = mockInitialState();
      const action = {
        type: 'Unknown',
      };

      // when
      const state = shoppingReducer(initialState, action);

      // then
      expect(state).toEqual(initialState);
    });
  });
  describe('retrieveShoppingListActionSuccess', () => {
    it('should set categories', () => {
      // given
      const initialState = mockInitialState();
      initialState.shoppingList = [];
      const shoppingList = [
        {
          idShopping: 1,
          idProduct: 5556,
          idUnit: 87,
          name: 'test',
          optLock: 12,
        },
      ] as Shopping[];
      const action = retrieveShoppingListActionSuccess({
        shopping: shoppingList,
      });

      // when
      const state = shoppingReducer(initialState, action);

      // then
      expect(state.shoppingList).toEqual(shoppingList);
    });
  });
  describe('retrievedShoppingActionSuccess', () => {
    it('should set categories', () => {
      // given
      const initialState = mockInitialState();
      initialState.shoppingEdit = {} as Shopping;
      const shopping = {
        idShopping: 1,
        idProduct: 5556,
        idUnit: 87,
        name: 'test',
        optLock: 12,
      } as Shopping;
      const action = retrievedShoppingActionSuccess({
        shopping,
      });

      // when
      const state = shoppingReducer(initialState, action);

      // then
      expect(state.shoppingEdit).toEqual(shopping);
    });
  });
});
