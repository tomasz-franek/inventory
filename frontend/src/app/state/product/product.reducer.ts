import {
  retrievedProductActionSuccess,
  retrievedProductListActionSuccess,
  retrievedProductPriceActionSuccess,
  saveProduct,
  setActiveProduct,
  setProductCategoryId,
} from './product.action';
import {ProductState} from './product.selectors';
import {createReducer, on} from '@ngrx/store';

export const initialProductState: ProductState = {
  products: [],
  productEdit: {
    name: '',
    active: false,
    idCategory: 0,
    optLock: 0,
    fragile: false,
  },
  productPrice: {
    idProduct: 0,
    maxPrice: 0,
    minPrice: 0,
    lastPrice: 0,
    averagePrice: 0,
  },
  idCategory: 0,
  active: true,
};
export const productReducer = createReducer(
  initialProductState,
  on(saveProduct, (state, action): ProductState => {
    if (action.product.idProduct !== undefined) {
      return {
        ...state,
        products: state.products.map((product) =>
          product.idProduct === action.product.idProduct
            ? action.product
            : product
        ),
      };
    } else {
      return {
        ...state,
        products: [...state.products, action.product],
      };
    }
  }),
  on(retrievedProductListActionSuccess, (state, action): ProductState => {
    return { ...state, products: action.products };
  }),
  on(setActiveProduct, (state, action): ProductState => {
    return { ...state, active: action.active };
  }),
  on(setProductCategoryId, (state, action): ProductState => {
    return { ...state, idCategory: action.idCategory };
  }),
  on(retrievedProductActionSuccess, (state, action): ProductState => {
    return { ...state, productEdit: action.product };
  }),
    on(retrievedProductPriceActionSuccess, (state, action): ProductState => {
      return { ...state, productPrice: action.productPrice };
    });
);
