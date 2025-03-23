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
import { ReportEffects } from './report.effects';
import {
  InventoryReportData,
  LastUsedData,
  NextDayExpiredData,
  PriceCategoryData,
  ProductAvailabilityData,
  ProductPredictionData,
  ProductPriceHistoryData,
  PurchasesData,
  StorageReportDataRow,
  StorageValueHistoryData,
} from '../../api';
import {
  readProductAvailabilityForPeriod,
  retrieveExpiredInventoryReportData,
  retrieveInventoryReportData,
  retrieveLastUsedReportData,
  retrieveListPurchases,
  retrieveNexDaysExpiredData,
  retrieveProductPredictionData,
  retrieveProductPriceHistory,
  retrieveReportPdfExpired,
  retrieveReportPdfInventory,
  retrieveReportPdfShopping,
  retrieveStorageValueHistory,
  retrieveSumPricesByCategory,
  retrieveValidInventoryData,
} from './report.action';
import { hot } from 'jasmine-marbles';

describe('ReportEffects', () => {
  let apiService: ApiService;
  let actions$: Observable<Action>;
  let effects: ReportEffects;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        ReportEffects,
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

    effects = TestBed.inject(ReportEffects);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  describe('loadInventoryReportData$', () => {
    it('should dispatch retrieveInventoryReportDataSuccess when backend return InventoryReportData', () => {
      // given
      const inventoryReportData = [
        {
          idProduct: 1,
          items: 1,
          productName: 'product 1',
          validDate: '2020-05-01',
        },
      ] as InventoryReportData[];
      spyOn(apiService, 'getInventoryReportData').and.returnValue(
        of(inventoryReportData) as any
      );
      actions$ = of(retrieveInventoryReportData({ idInventory: 1 }));

      // when
      effects.loadInventoryReportData$.subscribe((action) => {
        // then
        expect(apiService.getInventoryReportData).toHaveBeenCalledWith(1);
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Success',
          inventory: inventoryReportData,
        });
      });
    });

    it('should dispatch retrieveReportDataError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getInventoryReportData').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveInventoryReportData({ idInventory: 4 }));

      // when
      effects.loadInventoryReportData$.subscribe((action) => {
        // then
        expect(apiService.getInventoryReportData).toHaveBeenCalledWith(4);
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Error',
          error,
        });
      });
    });
  });
  describe('loadExpiredInventoryReportData$', () => {
    it('should dispatch retrieveExpiredInventoryReportDataSuccess when backend return InventoryReportData', () => {
      // given
      const inventoryReportData = [
        {
          idProduct: 1,
          items: 1,
          productName: 'product 1',
          validDate: '2020-05-01',
        },
      ] as InventoryReportData[];
      spyOn(apiService, 'getExpiredInventoryReportData').and.returnValue(
        of(inventoryReportData) as any
      );
      actions$ = of(retrieveExpiredInventoryReportData({ idInventory: 1 }));

      // when
      effects.loadExpiredInventoryReportData$.subscribe((action) => {
        // then
        expect(apiService.getExpiredInventoryReportData).toHaveBeenCalledWith(
          1
        );
        expect(action).toEqual({
          type: '[Report] Retrieve Expired Inventory Report Success',
          expired: inventoryReportData,
        });
      });
    });

    it('should dispatch retrieveReportDataError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getExpiredInventoryReportData').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveExpiredInventoryReportData({ idInventory: 1 }));

      // when
      effects.loadExpiredInventoryReportData$.subscribe((action) => {
        // then
        expect(apiService.getExpiredInventoryReportData).toHaveBeenCalledWith(
          1
        );
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Error',
          error,
        });
      });
    });
  });
  describe('loadLastUsedReportData$', () => {
    it('should dispatch retrieveLastUsedReportDataSuccess when backend return LastUsedData', () => {
      // given
      const lastUsedData = [
        {
          idProduct: 1,
          productName: 'product 1',
          endDate: '2020-05-01',
        },
      ] as LastUsedData[];
      spyOn(apiService, 'getLastUsedInventoryReportData').and.returnValue(
        of(lastUsedData) as any
      );
      actions$ = of(retrieveLastUsedReportData({ idInventory: 12 }));

      // when
      effects.loadLastUsedReportData$.subscribe((action) => {
        // then
        expect(apiService.getLastUsedInventoryReportData).toHaveBeenCalledWith(
          12
        );
        expect(action).toEqual({
          type: '[Report] Retrieve Last UsedReport Success',
          lastUsed: lastUsedData,
        });
      });
    });

    it('should dispatch retrieveReportDataError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getLastUsedInventoryReportData').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveLastUsedReportData({ idInventory: 5 }));

      // when
      effects.loadLastUsedReportData$.subscribe((action) => {
        // then
        expect(apiService.getLastUsedInventoryReportData).toHaveBeenCalledWith(
          5
        );
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Error',
          error,
        });
      });
    });
  });
  describe('loadStoragePrediction$', () => {
    it('should dispatch retrieveProductPredictionDataSuccess when backend return ProductPredictionData', () => {
      // given
      const productPrediction = [
        {
          idProduct: 1,
          productName: 'product 1',
          available: 2,
          countItems: 2,
          countUsed: 2,
          limitMax: 1,
          limitMed: 2,
          limitMin: 3,
          minimalProductBuyingDate: '2020-05-01',
          predictedAvailabilityDate: '2020-05-01',
          predictedAvailabilityEpoch: 12,
        },
      ] as ProductPredictionData[];
      spyOn(apiService, 'getStoragePrediction').and.returnValue(
        of(productPrediction) as any
      );
      actions$ = hot('-a', {
        a: retrieveProductPredictionData(),
      });

      // when
      expect(effects.loadStoragePrediction$).toBeObservable(
        // then
        hot('-(bc)', {
          b: {
            type: '[Report] Retrieve Product Prediction Data Success',
            productPrediction: productPrediction,
          },
          c: {
            type: '[Report] Filter Product Prediction',
            days: 60,
          },
        })
      );
    });

    it('should dispatch retrieveReportDataError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getStoragePrediction').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveProductPredictionData());

      // when
      effects.loadStoragePrediction$.subscribe((action) => {
        // then
        expect(apiService.getStoragePrediction).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Error',
          error,
        });
      });
    });
  });
  describe('loadAvailabilityForProduct$', () => {
    it('should dispatch retrieveProductAvailabilityDataSuccess when backend return ProductAvailabilityData', () => {
      // given
      const availability = [
        {
          productName: 'product 1',
          count: 2,
          availabilityDate: '2020-05-01',
        },
      ] as ProductAvailabilityData[];
      spyOn(apiService, 'getProductAvailabilityForPeriod').and.returnValue(
        of(availability) as any
      );
      actions$ = of(
        readProductAvailabilityForPeriod({ idProduct: 9, period: 32 })
      );

      // when
      effects.loadAvailabilityForProduct$.subscribe((action) => {
        // then
        expect(apiService.getProductAvailabilityForPeriod).toHaveBeenCalledWith(
          9,
          32
        );
        expect(action).toEqual({
          type: '[Report] Retrieve Product Availability Data Success',
          availability: availability,
        });
      });
    });

    it('should dispatch retrieveReportDataError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getProductAvailabilityForPeriod').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(
        readProductAvailabilityForPeriod({ idProduct: 1, period: 12 })
      );

      // when
      effects.loadAvailabilityForProduct$.subscribe((action) => {
        // then
        expect(apiService.getProductAvailabilityForPeriod).toHaveBeenCalledWith(
          1,
          12
        );
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Error',
          error,
        });
      });
    });
  });
  describe('loadNextDaysExpiredData$', () => {
    it('should dispatch retrieveNexDaysExpiredDataSuccess when backend return NextDayExpiredData', () => {
      // given
      const nextDaysExpired = [
        {
          productName: 'product 1',
          idProduct: 12,
          validDate: '2020-05-01',
          used: 2,
          inventoryName: 'inventoryName 1',
        },
      ] as NextDayExpiredData[];
      spyOn(apiService, 'getNextDaysExpired').and.returnValue(
        of(nextDaysExpired) as any
      );
      actions$ = of(retrieveNexDaysExpiredData({ days: 12 }));

      // when
      effects.loadNextDaysExpiredData$.subscribe((action) => {
        // then
        expect(apiService.getNextDaysExpired).toHaveBeenCalledWith(12);
        expect(action).toEqual({
          type: '[Report] Retrieve Nex DaysExpired Data Success',
          nextDaysExpired: nextDaysExpired,
        });
      });
    });

    it('should dispatch retrieveReportDataError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getNextDaysExpired').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveNexDaysExpiredData({ days: 5 }));

      // when
      effects.loadNextDaysExpiredData$.subscribe((action) => {
        // then
        expect(apiService.getNextDaysExpired).toHaveBeenCalledWith(5);
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Error',
          error,
        });
      });
    });
  });
  describe('loadStorageValueHistory$', () => {
    it('should dispatch retrieveStorageValueHistoryDataSuccess when backend return StorageValueHistoryData', () => {
      // given
      const valueHistoryData = [
        {
          idItem: 12,
          operationDate: '2020-05-01',
          price: 333.4,
        },
      ] as StorageValueHistoryData[];
      spyOn(apiService, 'getStorageValueHistory').and.returnValue(
        of(valueHistoryData) as any
      );
      actions$ = of(retrieveStorageValueHistory({ days: 12 }));

      // when
      effects.loadStorageValueHistory$.subscribe((action) => {
        // then
        expect(apiService.getStorageValueHistory).toHaveBeenCalledWith(12);
        expect(action).toEqual({
          type: '[Report] Retrieve Storage Value History Success',
          valueHistoryData: valueHistoryData,
        });
      });
    });

    it('should dispatch retrieveReportDataError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getStorageValueHistory').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveStorageValueHistory({ days: 5 }));

      // when
      effects.loadStorageValueHistory$.subscribe((action) => {
        // then
        expect(apiService.getStorageValueHistory).toHaveBeenCalledWith(5);
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Error',
          error,
        });
      });
    });
  });
  describe('loadProductPriceHistory$', () => {
    it('should dispatch retrieveProductPriceHistoryDataSuccess when backend return ProductPriceHistoryData', () => {
      // given
      const priceHistoryData = [
        {
          price: 12,
          operationDate: '2020-05-01',
        },
      ] as ProductPriceHistoryData[];
      spyOn(apiService, 'getProductPriceHistory').and.returnValue(
        of(priceHistoryData) as any
      );
      actions$ = of(retrieveProductPriceHistory({ idProduct: 34 }));

      // when
      effects.loadProductPriceHistory$.subscribe((action) => {
        // then
        expect(apiService.getProductPriceHistory).toHaveBeenCalledWith(34);
        expect(action).toEqual({
          type: '[Report] Retrieve Storage Value History Success',
          priceHistoryData: priceHistoryData,
        });
      });
    });

    it('should dispatch retrieveReportDataError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getProductPriceHistory').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveProductPriceHistory({ idProduct: 5 }));

      // when
      effects.loadProductPriceHistory$.subscribe((action) => {
        // then
        expect(apiService.getProductPriceHistory).toHaveBeenCalledWith(5);
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Error',
          error,
        });
      });
    });
  });
  describe('loadSumPricesByCategory$', () => {
    it('should dispatch retrieveSumPricesByCategoryDataSuccess when backend return PriceCategoryData', () => {
      // given
      const sumPriceCategoryData = [
        {
          idCategory: 2,
          value: 24,
          categoryName: 'category',
        },
      ] as PriceCategoryData[];
      spyOn(apiService, 'getSumPricesByCategory').and.returnValue(
        of(sumPriceCategoryData) as any
      );
      actions$ = of(retrieveSumPricesByCategory());

      // when
      effects.loadSumPricesByCategory$.subscribe((action) => {
        // then
        expect(apiService.getSumPricesByCategory).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Report] Retrieve Sum Prices History Success',
          sumPriceCategoryData: sumPriceCategoryData,
        });
      });
    });

    it('should dispatch retrieveReportDataError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getSumPricesByCategory').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveSumPricesByCategory());

      // when
      effects.loadSumPricesByCategory$.subscribe((action) => {
        // then
        expect(apiService.getSumPricesByCategory).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Error',
          error,
        });
      });
    });
  });
  describe('loadListPurchases$', () => {
    it('should dispatch retrieveListPurchasesSuccess when backend return PurchasesData', () => {
      // given
      const purchasesData = [
        {
          price: 12,
          items: 3,
          idStorage: 911,
          productName: 'product1',
          insertDate: '2020-05-01',
          priceSum: 14,
        },
      ] as PurchasesData[];
      spyOn(apiService, 'getListRecentPurchases').and.returnValue(
        of(purchasesData) as any
      );
      actions$ = of(retrieveListPurchases({ days: 102 }));

      // when
      effects.loadListPurchases$.subscribe((action) => {
        // then
        expect(apiService.getListRecentPurchases).toHaveBeenCalledWith(102);
        expect(action).toEqual({
          type: '[Report] Retrieve Last Purchases Success',
          purchasesData: purchasesData,
        });
      });
    });

    it('should dispatch retrieveReportDataError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getListRecentPurchases').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveListPurchases({ days: 21 }));

      // when
      effects.loadListPurchases$.subscribe((action) => {
        // then
        expect(apiService.getListRecentPurchases).toHaveBeenCalledWith(21);
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Error',
          error,
        });
      });
    });
  });
  describe('loadValidInventoryData$', () => {
    it('should dispatch retrieveValidInventorySuccess when backend return StorageReportDataRow', () => {
      // given
      const validInventory = [
        {
          idCategory: 2,
          idProduct: 23,
          productName: 'product1',
          validList: [
            {
              validDate: '2020-05-01',
              count: 32,
            },
          ],
        },
      ] as StorageReportDataRow[];
      spyOn(apiService, 'getValidInventoryReport').and.returnValue(
        of(validInventory) as any
      );
      actions$ = of(retrieveValidInventoryData());

      // when
      effects.loadValidInventoryData$.subscribe((action) => {
        // then
        expect(apiService.getValidInventoryReport).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Report] Retrieve Valid Inventory Success',
          validInventory: validInventory,
        });
      });
    });

    it('should dispatch retrieveReportDataError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getValidInventoryReport').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveValidInventoryData());

      // when
      effects.loadValidInventoryData$.subscribe((action) => {
        // then
        expect(apiService.getValidInventoryReport).toHaveBeenCalledWith();
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Error',
          error,
        });
      });
    });
  });
  describe('loadReportPdfShopping$', () => {
    it('should dispatch reportPdfDownloadSuccess when backend return Blob', () => {
      // given
      const blob = {} as Blob;
      spyOn(apiService, 'reportPdfShopping').and.returnValue(of(blob) as any);
      actions$ = of(retrieveReportPdfShopping());

      // when
      effects.loadReportPdfShopping$.subscribe((action) => {
        // then
        expect(apiService.reportPdfShopping).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Report] Retrieve PDF Download Success',
          blob: blob,
        });
      });
    });

    it('should dispatch retrieveReportDataError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'reportPdfShopping').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveReportPdfShopping());

      // when
      effects.loadReportPdfShopping$.subscribe((action) => {
        // then
        expect(apiService.reportPdfShopping).toHaveBeenCalledWith();
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Error',
          error,
        });
      });
    });
  });
  describe('loadReportPdfExpired$', () => {
    it('should dispatch reportPdfDownloadSuccess when backend return Blob', () => {
      // given
      const blob = {} as Blob;
      spyOn(apiService, 'reportPdfExpired').and.returnValue(of(blob) as any);
      actions$ = of(retrieveReportPdfExpired());

      // when
      effects.loadReportPdfExpired$.subscribe((action) => {
        // then
        expect(apiService.reportPdfExpired).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Report] Retrieve PDF Download Success',
          blob: blob,
        });
      });
    });

    it('should dispatch retrieveReportDataError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'reportPdfExpired').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveReportPdfExpired());

      // when
      effects.loadReportPdfExpired$.subscribe((action) => {
        // then
        expect(apiService.reportPdfExpired).toHaveBeenCalledWith();
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Error',
          error,
        });
      });
    });
  });
  describe('loadReportPdfInventory$', () => {
    it('should dispatch reportPdfDownloadSuccess when backend return Blob', () => {
      // given
      const blob = {} as Blob;
      spyOn(apiService, 'reportPdfInventory').and.returnValue(of(blob) as any);
      actions$ = of(retrieveReportPdfInventory());

      // when
      effects.loadReportPdfInventory$.subscribe((action) => {
        // then
        expect(apiService.reportPdfInventory).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Report] Retrieve PDF Download Success',
          blob: blob,
        });
      });
    });

    it('should dispatch retrieveReportDataError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'reportPdfInventory').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveReportPdfInventory());

      // when
      effects.loadReportPdfInventory$.subscribe((action) => {
        // then
        expect(apiService.reportPdfInventory).toHaveBeenCalledWith();
        expect(action).toEqual({
          type: '[Report] Retrieve Inventory Report Error',
          error,
        });
      });
    });
  });
});
