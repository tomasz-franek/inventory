import { ApiService } from '../../services/api.service';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
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
import { ItemsEffects } from './item.effects';
import { ConsumeProduct, ItemConsume, StorageItem } from '../../api';
import {
  consumeItem,
  retrieveConsumeProductListInventoryCategory,
  retrieveConsumeProductListInventoryCategoryProduct,
  retrieveItemsWithoutInventory,
  updateItemByInventory,
} from './item.action';

describe('ItemEffects', () => {
  let apiService: ApiService;
  let actions$: Observable<Action>;
  let effects: ItemsEffects;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        ItemsEffects,
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

    effects = TestBed.inject(ItemsEffects);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  describe('loadItemsWithoutInventory$', () => {
    it('should dispatch retrievedItemsWithoutInventoryListActionSuccess when load Items', () => {
      // given
      let storageItems = [
        {
          idStorage: 1,
          productName: 'testProduct',
          ids: [7, 9, 10],
          validDate: '2025-03-21',
        },
      ] as StorageItem[];
      spyOn(apiService, 'getItemsWithoutInventory').and.returnValue(
        of(storageItems)
      );
      actions$ = of(retrieveItemsWithoutInventory());

      // when
      effects.loadItemsWithoutInventory$.subscribe((action) => {
        // then
        expect(apiService.getItemsWithoutInventory).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Item] Retrieved Items Without Inventory Action Success',
          itemsWithoutInventoryList: storageItems,
        });
      });
    });

    it('should dispatch retrievedItemsListActionError when load error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getItemsWithoutInventory').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveItemsWithoutInventory());

      // when
      effects.loadItemsWithoutInventory$.subscribe((action) => {
        // then
        expect(apiService.getItemsWithoutInventory).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Item] Retrieved Items Without Inventory Action Error',
          error,
        });
      });
    });
  });
  describe('loadConsumeProductListInventoryCategoryProduct$', () => {
    it('should dispatch retrievedItemsWithoutInventoryCategoryProductActionSuccess when load Items', () => {
      let consumeProducts = [
        {
          idItem: 0,
          idProduct: 0,
          validDate: '2025-03-21',
          endDate: '2025-03-21',
          insertDate: '2025-03-21',
          productName: 'testProduct',
          inventoryName: 'testInventory',
          used: 0,
          price: 0,
        },
      ] as ConsumeProduct[];
      spyOn(
        apiService,
        'getConsumeProductListInventoryCategoryProduct'
      ).and.returnValue(of(consumeProducts));

      actions$ = of(
        retrieveConsumeProductListInventoryCategoryProduct({
          idInventory: 1,
          idCategory: 2,
          idProduct: 4,
        })
      );

      // when
      effects.loadConsumeProductListInventoryCategoryProduct$.subscribe(
        (action) => {
          // then
          expect(
            apiService.getConsumeProductListInventoryCategoryProduct
          ).toHaveBeenCalledWith(1, 2, 4);
          expect(action).toEqual({
            type: '[Item] Retrieved Consume ProductList Success',
            consumeProductList: consumeProducts,
          });
        }
      );
    });
    it('should dispatch retrievedItemsListActionError when load error', () => {
      //given
      const error = new HttpErrorResponse({});
      spyOn(
        apiService,
        'getConsumeProductListInventoryCategoryProduct'
      ).and.returnValue(throwError(() => error));
      actions$ = of(
        retrieveConsumeProductListInventoryCategoryProduct({
          idInventory: 1,
          idCategory: 8,
          idProduct: 6,
        })
      );

      // when
      effects.loadConsumeProductListInventoryCategoryProduct$.subscribe(
        (action) => {
          // then
          expect(
            apiService.getConsumeProductListInventoryCategoryProduct
          ).toHaveBeenCalledWith(1, 8, 6);
          expect(action).toEqual({
            type: '[Item] Retrieved Consume Products Action Error',
            error,
          });
        }
      );
    });
  });
  describe('loadConsumeProductListInventoryCategory$', () => {
    it('should dispatch retrievedItemsListInventoryCategoryProductActionSuccess when load Items', () => {
      //given
      let consumeProducts = [
        {
          idItem: 0,
          idProduct: 0,
          validDate: '2025-03-21',
          endDate: '2025-03-21',
          insertDate: '2025-03-21',
          productName: 'testProduct',
          inventoryName: 'testInventory',
          used: 0,
          price: 0,
        },
      ] as ConsumeProduct[];
      spyOn(
        apiService,
        'getConsumeProductListInventoryCategory'
      ).and.returnValue(of(consumeProducts));
      actions$ = of(
        retrieveConsumeProductListInventoryCategory({
          idInventory: 5,
          idCategory: 12,
        })
      );

      //when
      effects.loadConsumeProductListInventoryCategory$.subscribe((action) => {
        // then
        expect(
          apiService.getConsumeProductListInventoryCategory
        ).toHaveBeenCalledWith(5, 12);
        expect(action).toEqual({
          type: '[Item] Retrieved Consume ProductList Success',
          consumeProductList: consumeProducts,
        });
      });
    });
    it('should dispatch retrievedItemsListInventoryCategoryProductActionError', () => {
      //given
      const error = new HttpErrorResponse({});
      spyOn(
        apiService,
        'getConsumeProductListInventoryCategoryProduct'
      ).and.returnValue(throwError(() => error));
      actions$ = of(
        retrieveConsumeProductListInventoryCategoryProduct({
          idInventory: 1,
          idCategory: 8,
          idProduct: 6,
        })
      );

      // when
      effects.loadConsumeProductListInventoryCategory$.subscribe((action) => {
        // then
        expect(
          apiService.getConsumeProductListInventoryCategoryProduct
        ).toHaveBeenCalledWith(1, 8, 6);
        expect(action).toEqual({
          type: '[Item] Retrieved Consume Products Action Error',
          error,
        });
      });
    });
  });
  describe('updateItemInventory$', () => {
    it('should dispatch retrievedItemsListInventoryCategoryProductActionSuccess', () => {
      //given
      spyOn(apiService, 'updateItemByInventoryId').and.returnValue(of({}));
      actions$ = of(
        updateItemByInventory({
          idInventory: 5,
          idItem: 12,
        })
      );

      //when
      effects.updateItemInventory$.subscribe((action) => {
        // then
        expect(apiService.updateItemByInventoryId).toHaveBeenCalledWith(12, 5);
        expect(action).toEqual({
          type: '[Item] Save Item Success',
        });
      });
    });
    it('should dispatch retrievedItemsListInventoryCategoryProductActionError', () => {
      //given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'updateItemByInventoryId').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(
        updateItemByInventory({
          idInventory: 1,
          idItem: 8,
        })
      );

      // when
      effects.updateItemInventory$.subscribe((action) => {
        // then
        expect(apiService.updateItemByInventoryId).toHaveBeenCalledWith(8, 1);
        expect(action).toEqual({
          type: '[Item] Save Item Action Error',
          error,
        });
      });
    });
  });
  describe('consumeItem$', () => {
    it('should dispatch consumeItemSuccess when consume Item', () => {
      // given
      const item = {
        idItem: 2,
        used: 0,
        endDate: '2025-03-21',
      } as ItemConsume;
      spyOn(apiService, 'consumeItem').and.returnValue(of(item) as any);
      actions$ = of(consumeItem({ itemToConsume: item }));

      // when
      effects.consume$.subscribe((action) => {
        // then
        expect(apiService.consumeItem).toHaveBeenCalledWith(item);
        expect(action).toEqual({
          type: '[Item] Consume Item Success',
        });
      });
    });
  });
});
