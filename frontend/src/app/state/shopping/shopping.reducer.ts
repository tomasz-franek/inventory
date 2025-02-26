import { ShoppingState } from './shopping.selectors';
import { retrievedShoppingListActionSuccess } from './shopping.action';

export const initialShoppingState: ShoppingState = {
  shoppingList: [],
  shoppingEdit: {
    name: '',
    items: 0,
    optLock: 0,
  },
};

export function shoppingReducer(
  state = initialShoppingState,
  action: any
): ShoppingState {
  switch (action.type) {
    case retrievedShoppingListActionSuccess.type:
      return { ...state, shoppingList: action.shopping };
    default:
      return state;
  }
}
