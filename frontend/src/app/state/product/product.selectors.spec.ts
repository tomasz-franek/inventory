import { Product, ProductPrice } from '../../api';
import {
  editProductSelector,
  filterProductByCategory,
  filterProducts,
  getProductsList,
  newProductSelector,
  productPriceSelector,
  ProductState,
  selectActiveProduct,
  selectProductById,
} from './product.selectors';

describe('ProductSelectors', () => {
  let mockProducts = [
    { idProduct: 1, name: 'name1', active: true, idCategory: 1 },
    { idProduct: 2, name: 'name2', active: false, idCategory: 2 },
  ] as Product[];
  let mockProduct = { idProduct: 3, name: 'name13' } as Product;
  let mockProductPrice = {
    maxPrice: 1,
    idProduct: 1,
    averagePrice: 1,
    lastPrice: 1,
    minPrice: 1,
  } as ProductPrice;
  let initialState = {
    products: mockProducts,
    productEdit: mockProduct,
    productPrice: mockProductPrice,
    active: true,
    idCategory: 2,
  } as ProductState;

  it('should select products', () => {
    // when
    const result = getProductsList.projector(initialState);

    // then
    expect(result).toEqual(mockProducts);
  });

  it('should select product by Id', () => {
    // when
    const result = selectProductById(1).projector(initialState);

    // then
    expect(result).toEqual(mockProducts[0]);
  });
  it('should select active product', () => {
    // when
    const result = selectActiveProduct.projector(initialState);

    // then
    expect(result).toEqual(true);
  });
  it('should select only active products', () => {
    // when
    const result = filterProducts.projector(initialState, true);

    // then
    expect(result).toEqual([mockProducts[0]]);
  });
  it('should select all products', () => {
    // when
    const result = filterProducts.projector(initialState, false);

    // then
    expect(result).toEqual(mockProducts);
  });
  it('should select all products', () => {
    // when
    const result = filterProductByCategory.projector(initialState, true);

    // then
    expect(result).toEqual([]);
  });
  it('should select active products', () => {
    // when
    const result = filterProductByCategory.projector(initialState, false);

    // then
    expect(result).toEqual([mockProducts[1]]);
  });
  it('should select empty product', () => {
    // when
    const result = newProductSelector.projector(initialState);

    // then
    expect(result).toEqual({} as Product);
  });
  it('should select edit product', () => {
    // when
    const result = editProductSelector.projector(initialState);

    // then
    expect(result).toEqual(mockProduct);
  });
  it('should select product price', () => {
    // when
    const result = productPriceSelector.projector(initialState);

    // then
    expect(result).toEqual(mockProductPrice);
  });
});
