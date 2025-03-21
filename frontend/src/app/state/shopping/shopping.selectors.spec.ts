import {
  editShoppingSelector,
  getShoppingList,
  ShoppingState,
} from './shopping.selectors';
import { Shopping } from '../../api';

describe('ShoppingSelectors', () => {
  const mockList = [
    {
      idShopping: 7,
    },
    {
      idShopping: 12,
      idProduct: 554,
      idUnit: 42,
    },
  ] as Shopping[];
  const mockEdit = {
    idShopping: 12,
    idProduct: 554,
    idUnit: 42,
  } as Shopping;
  let initialState = {
    shoppingList: mockList,
    shoppingEdit: mockEdit,
  } as ShoppingState;
  it('should select shoppingList', () => {
    // when
    const result = getShoppingList.projector(initialState);

    // then
    expect(result).toEqual(mockList);
  });
  it('should select shoppingEdit', () => {
    // when
    const result = editShoppingSelector.projector(initialState);

    // then
    expect(result).toEqual(mockEdit);
  });
});
