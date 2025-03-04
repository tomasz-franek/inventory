import { ShoppingState } from './shopping.selectors';
import { retrievedShoppingListActionSuccess } from './shopping.action';
import { createReducer, on } from '@ngrx/store';

export const initialShoppingState: ShoppingState = {
  shoppingList: [],
  shoppingEdit: {
    name: '',
    items: 0,
    optLock: 0,
  },
};
export const shoppingReducer = createReducer(
  initialShoppingState,
  on(retrievedShoppingListActionSuccess, (state, action): ShoppingState => {
    return { ...state, shoppingList: action.shopping };
  })
);
