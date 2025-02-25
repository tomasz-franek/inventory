import {
  retrievedProductActionSuccess,
  retrievedProductListActionSuccess,
  saveProduct,
  setActiveProduct,
  setCategoryId,
} from './product.action';
import { ProductState } from './product.selectors';

export const initialProductState: ProductState = {
  products: [],
  productEdit: {
    name: '',
    active: false,
    idCategory: 0,
    optLock: 0,
    fragile: false,
  },
  categoryId: 0,
  active: true,
};

export function productReducer(
  state: ProductState = initialProductState,
  action: any
): ProductState {
  switch (action.type) {
    case saveProduct.type:
      if (action.product.id !== undefined) {
        return {
          ...state,
          products: state.products.map((product) =>
            product.idProduct === action.product.id ? action.product : product
          ),
        };
      } else {
        return {
          ...state,
          products: [...state.products, action.product],
        };
      }
    case retrievedProductListActionSuccess.type:
      return { ...state, products: action.products };
    case setActiveProduct.type:
      return { ...state, active: action.active };
    case setCategoryId.type:
      return { ...state, categoryId: action.categoryId };
    case retrievedProductActionSuccess.type:
      return { ...state, productEdit: action.product };
    default:
      return state;
  }
}
