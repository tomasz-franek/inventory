import {retrievedProductListActionSuccess, saveProduct} from './product.action';
import {ProductState} from './product.selectors';

export const initialProductState: ProductState = {
  products:[],
  productEdit:undefined
};

export function productReducer(state:ProductState = initialProductState, action: any): ProductState {
  switch (action.type) {
    case saveProduct.type:
      if (action.product.id !== undefined) {
        return {
          ...state,
          products: state.products.map(product => (product.id === action.product.id ? action.product : product))
        };
      } else {
        return {
          ...state, products: [...state.products, action.product]
        };

      }
    case retrievedProductListActionSuccess.type:
      return {...state, products: action.products};
    default:
      return state;
  }
}


