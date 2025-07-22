import { ProductState } from './product.selectors';
import { productReducer } from './product.reducer';
import {
  retrievedProductActionSuccess,
  retrievedProductListActionSuccess,
  retrievedProductPriceActionSuccess,
  saveProduct,
  setActiveProduct,
  setProductCategoryId,
} from './product.action';

describe('ProductReducer', () => {
  const mockInitialState = (): ProductState => {
    return {
      idCategory: 1,
      active: false,
      productPrice: {
        idProduct: 12,
        lastPrice: 3,
        averagePrice: 4,
        maxPrice: 15,
        minPrice: 2,
      },
      productEdit: {
        idProduct: 12,
        idCategory: 4,
        name: 'Product 1',
        active: true,
        optLock: 12,
        fragile: false,
      },
      products: [
        {
          idProduct: 12,
          idCategory: 4,
          name: 'Product 1',
          active: true,
          optLock: 12,
          fragile: false,
        },
      ],
    } as ProductState;
  };

  describe('unknown action', () => {
    it('should return the default state', () => {
      // given
      const initialState = mockInitialState();
      const action = {
        type: 'Unknown',
      };

      // when
      const state = productReducer(initialState, action);

      // then
      expect(state).toEqual(initialState);
    });
  });
  describe('retrievedProductListActionSuccess', () => {
    it('should set products', () => {
      // given
      const initialState = mockInitialState();
      initialState.products = [];
      let products = [
        {
          idCategory: 3,
          idProduct: undefined,
          fragile: false,
          name: '',
          active: false,
          optLock: 0,
        },
      ];
      const action = retrievedProductListActionSuccess({ products });

      // when
      const state = productReducer(initialState, action);

      // then
      expect(state.products).toEqual(products);
    });
  });
  describe('saveProduct', () => {
    it('should set products', () => {
      // given
      const initialState = mockInitialState();
      initialState.products = [];
      let product = {
        idCategory: 3,
        idProduct: undefined,
        fragile: false,
        name: '',
        active: false,
        optLock: 0,
      };
      const action = saveProduct({ product });

      // when
      const state = productReducer(initialState, action);

      // then
      expect(state.products.length).toEqual(1);
      expect(state.products[0]).toEqual(product);
    });
  });
  describe('setActiveProduct', () => {
    it('should set active', () => {
      // given
      const initialState = mockInitialState();
      initialState.active = false;
      const action = setActiveProduct({ active: true });

      // when
      const state = productReducer(initialState, action);

      // then
      expect(state.active).toEqual(true);
    });
  });
  describe('setProductCategoryId', () => {
    it('should set idCategory', () => {
      // given
      const initialState = mockInitialState();
      initialState.idCategory = 0;
      const action = setProductCategoryId({ idCategory: 1 });

      // when
      const state = productReducer(initialState, action);

      // then
      expect(state.idCategory).toEqual(1);
    });
  });
  describe('retrievedProductActionSuccess', () => {
    it('should set productEdit', () => {
      // given
      const initialState = mockInitialState();
      let product = {
        idCategory: 3,
        idProduct: 3,
        fragile: false,
        name: '',
        active: false,
        optLock: 0,
      };
      initialState.productEdit = {
        idCategory: 1,
        idProduct: 1,
        fragile: false,
        name: '',
        active: false,
        optLock: 0,
      };
      const action = retrievedProductActionSuccess({ product: product });

      // when
      const state = productReducer(initialState, action);

      // then
      expect(state.productEdit).toEqual(product);
    });
  });
  describe('retrievedProductPriceActionSuccess', () => {
    it('should set productPrice', () => {
      // given
      const initialState = mockInitialState();
      let productPrice = {
        idProduct: 2,
        maxPrice: 2,
        minPrice: 2,
        lastPrice: 2,
        averagePrice: 2,
      };
      initialState.productPrice = {
        idProduct: 1,
        maxPrice: 1,
        minPrice: 1,
        lastPrice: 1,
        averagePrice: 1,
      };
      const action = retrievedProductPriceActionSuccess({ productPrice });

      // when
      const state = productReducer(initialState, action);

      // then
      expect(state.productPrice).toEqual(productPrice);
    });
  });
});
