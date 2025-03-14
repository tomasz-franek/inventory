import { ShoppingState } from './shopping.selectors';
import {
  retrievedShoppingActionSuccess,
  retrieveShoppingListActionSuccess,
} from './shopping.action';
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
  on(
    retrieveShoppingListActionSuccess,
    (state: ShoppingState, action): ShoppingState => {
      return { ...state, shoppingList: action.shopping };
    }
  ),
  on(
    retrievedShoppingActionSuccess,
    (state: ShoppingState, action): ShoppingState => {
      return { ...state, shoppingEdit: action.shopping };
    }
  )
);
