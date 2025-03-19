import { ApiService } from '../../services/api.service';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { ProductEffects } from './product.effects';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
} from '@angular/common/http';
import { provideMockActions } from '@ngrx/effects/testing';
import { Router } from '@angular/router';
import {
  loadProductAction,
  loadProductPriceAction,
  navigateToProductEdit,
  navigateToProductList,
  navigateToProductNew,
  retrieveProductList,
  saveProduct,
} from './product.action';
import { Product, ProductPrice } from '../../api';
import { hot } from 'jasmine-marbles';

describe('ProductEffects', () => {
  let apiService: ApiService;
  let actions$: Observable<Action>;
  let effects: ProductEffects;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        ProductEffects,
        provideMockStore({
          selectors: [],
        }),
        HttpClient,
        HttpHandler,
        provideMockActions(() => actions$),
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          },
        },
      ],
    });

    effects = TestBed.inject(ProductEffects);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadProducts$', () => {
    it('should dispatch retrievedProductListActionSuccess when backend return Categories', () => {
      // given
      const products = [
        {
          idProduct: 2,
          name: 'test',
          active: true,
          optLock: 1,
        },
      ] as Product[];
      spyOn(apiService, 'getProducts').and.returnValue(of(products) as any);
      actions$ = of(retrieveProductList());

      // when
      effects.loadProducts$.subscribe((action) => {
        // then
        expect(apiService.getProducts).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Product] Retrieved Product list',
          products: products,
        });
      });
    });

    it('should dispatch retrievedProductListActionError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getProducts').and.returnValue(throwError(() => error));
      actions$ = of(retrieveProductList());

      // when
      effects.loadProducts$.subscribe((action) => {
        // then
        expect(apiService.getProducts).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Product] Product list Error',
          error,
        });
      });
    });
  });
  describe('save$', () => {
    it('should dispatch saveProductActionSuccess when update Product', () => {
      // given
      const product = {
        idProduct: 2,
        idCategory: 2,
        name: 'test',
        active: true,
        optLock: 1,
      } as Product;
      spyOn(apiService, 'updateProduct').and.returnValue(of(product) as any);

      actions$ = hot('-a', {
        a: saveProduct({ product }),
      });

      // when
      expect(effects.save$).toBeObservable(
        // then
        hot('-(bc)', {
          b: {
            type: '[Product] Save ProductSuccess',
          },
          c: {
            type: '[Product] Navigate Product list',
          },
        })
      );
    });

    it('should dispatch saveProductActionSuccess when create Product', () => {
      // given
      const product = {
        idProduct: undefined,
        idCategory: 1,
        name: 'test',
        active: true,
        optLock: 1,
      } as Product;
      spyOn(apiService, 'createProduct').and.returnValue(of(product) as any);

      actions$ = hot('-a', {
        a: saveProduct({ product }),
      });

      // when
      expect(effects.save$).toBeObservable(
        // then
        hot('-(bc)', {
          b: {
            type: '[Product] Save ProductSuccess',
          },
          c: {
            type: '[Product] Navigate Product list',
          },
        })
      );
    });

    it('should dispatch saveProductActionError when backend returns error', () => {
      // given
      const product = {
        idProduct: undefined,
        idCategory: 1,
        name: 'test',
        active: true,
        optLock: 1,
      } as Product;
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'createProduct').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(saveProduct({ product }));

      // when
      effects.save$.subscribe((action) => {
        // then
        expect(apiService.createProduct).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Product] Save ProductError',
          error,
        });
      });
    });

    it('should dispatch saveProductActionError when backend returns error', () => {
      // given
      const product = {
        idProduct: 1,
        idCategory: 1,
        name: 'test',
        active: true,
        optLock: 1,
      } as Product;
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'updateProduct').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(saveProduct({ product }));

      // when
      effects.save$.subscribe((action) => {
        // then
        expect(apiService.updateProduct).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Product] Save ProductError',
          error,
        });
      });
    });
  });

  describe('loadProduct$', () => {
    it('should dispatch retrievedProductActionSuccess when backend return Product object', () => {
      // given
      const product = {
        idProduct: 44,
        idCategory: 1,
        name: 'test',
        active: true,
        optLock: 1,
      } as Product;
      spyOn(apiService, 'getProduct').and.returnValue(of(product) as any);

      actions$ = of(loadProductAction({ id: 44 }));

      // when
      effects.loadProduct$.subscribe((action) => {
        // then
        expect(apiService.getProduct).toHaveBeenCalledWith(44);
        expect(action).toEqual({
          type: '[Product] Load Product Success Action',
          product: product,
        });
      });
    });

    it('should dispatch retrievedProductActionError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getProduct').and.returnValue(throwError(() => error));
      actions$ = of(loadProductAction({ id: 2 }));

      // when
      effects.loadProduct$.subscribe((action) => {
        // then
        expect(apiService.getProduct).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Product] Product Error',
          error,
        });
      });
    });
  });
  describe('loadProductPrice$', () => {
    it('should dispatch retrievedProductPriceActionSuccess when backend return Product object', () => {
      // given
      const productPrice = {
        idProduct: 44,
        maxPrice: 1,
        averagePrice: 2,
        lastPrice: 3,
        minPrice: 4,
      } as ProductPrice;
      spyOn(apiService, 'readProductPrice').and.returnValue(
        of(productPrice) as any
      );

      actions$ = of(loadProductPriceAction({ id: 44 }));

      // when
      effects.loadProductPrice$.subscribe((action) => {
        // then
        expect(apiService.readProductPrice).toHaveBeenCalledWith(44);
        expect(action).toEqual({
          type: '[Product] Retrieved Product Price Success',
          productPrice: productPrice,
        });
      });
    });

    it('should dispatch retrievedProductPriceActionError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'readProductPrice').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(loadProductPriceAction({ id: 2 }));

      // when
      effects.loadProductPrice$.subscribe((action) => {
        // then
        expect(apiService.readProductPrice).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Product] Product Product Price Error',
          error,
        });
      });
    });
  });
  describe('openProductList$', () => {
    it('should navigate to products component', () => {
      // given
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToProductList());

      // when
      effects.openProductList$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/products']);
    });
  });
  describe('newProduct$', () => {
    it('should navigate to product-add', () => {
      // given
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToProductNew());

      // when
      effects.newProduct$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/product-add']);
    });
  });
  describe('editProduct$', () => {
    it('should navigate to categories component', () => {
      // given
      const product = {
        idProduct: 13,
        idCategory: 2,
        name: 'test',
        active: true,
        optLock: 1,
      } as Product;
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToProductEdit({ product }));

      // when
      effects.editProduct$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/product-add', 13]);
    });
  });
});
