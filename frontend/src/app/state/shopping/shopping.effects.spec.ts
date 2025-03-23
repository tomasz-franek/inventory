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
import { ShoppingEffects } from './shopping.effects';
import { Shopping } from '../../api';
import {
  deleteShopping,
  loadShoppingAction,
  navigateToShoppingEdit,
  navigateToShoppingList,
  navigateToShoppingNew,
  retrieveShoppingList,
  saveShopping,
} from './shopping.action';
import { hot } from 'jasmine-marbles';

describe('ShoppingEffects', () => {
  let apiService: ApiService;
  let actions$: Observable<Action>;
  let effects: ShoppingEffects;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        ShoppingEffects,
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

    effects = TestBed.inject(ShoppingEffects);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  describe('loadShoppingList$', () => {
    it('should dispatch retrieveShoppingListActionSuccess when backend return Shoppings', () => {
      // given
      const shopping = [
        {
          idShopping: 2,
          idProduct: 2,
          name: 'test',
          optLock: 1,
        },
      ] as Shopping[];
      spyOn(apiService, 'getShoppingList').and.returnValue(of(shopping) as any);
      actions$ = of(retrieveShoppingList());

      // when
      effects.loadShoppingList$.subscribe((action) => {
        // then
        expect(apiService.getShoppingList).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Shopping List] Success',
          shopping: shopping,
        });
      });
    });

    it('should dispatch retrieveShoppingListActionError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getShoppingList').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveShoppingList());

      // when
      effects.loadShoppingList$.subscribe((action) => {
        // then
        expect(apiService.getShoppingList).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Shopping List] Product list Error',
          error,
        });
      });
    });
  });
  describe('openShoppingList$', () => {
    it('should navigate to shopping component', () => {
      // given
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToShoppingList());

      // when
      effects.openShoppingList$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/shopping']);
    });
  });
  describe('newShopping$', () => {
    it('should navigate to shopping-add', () => {
      // given
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToShoppingNew());

      // when
      effects.newShopping$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/shopping-add']);
    });
  });
  describe('editShopping$', () => {
    it('should navigate to shopping-add component', () => {
      // given
      const shopping = {
        idShopping: 62,
        idProduct: 32,
        name: 'test',
        optLock: 1,
        items: 12,
      } as Shopping;
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToShoppingEdit({ shopping }));

      // when
      effects.editShopping$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/shopping-add', 62]);
    });
  });
  describe('deleteShopping$', () => {
    it('should dispatch retrieveShoppingListActionSuccess when backend return Shoppings', () => {
      // given
      const idShopping = 3;
      spyOn(apiService, 'deleteShopping').and.returnValue(of({}) as any);

      actions$ = hot('-a', {
        a: deleteShopping({ idShopping }),
      });

      // when
      expect(effects.deleteShopping$).toBeObservable(
        // then
        hot('-(bc)', {
          b: {
            type: '[Shopping] Delete Shopping Success',
          },
          c: {
            type: '[Shopping] Call Shopping list',
          },
        })
      );
    });

    it('should dispatch retrieveShoppingListActionError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'deleteShopping').and.returnValue(
        throwError(() => error)
      );
      const idShopping = 3;
      actions$ = of(deleteShopping({ idShopping }));

      // when
      effects.deleteShopping$.subscribe((action) => {
        // then
        expect(apiService.deleteShopping).toHaveBeenCalledWith(idShopping);
        expect(action).toEqual({
          type: '[Shopping] Delete Shopping Error',
          error,
        });
      });
    });
  });
  describe('saveShopping$', () => {
    it('should dispatch saveShoppingActionSuccess when save Shopping', () => {
      // given
      const shopping = {
        idShopping: undefined,
        idProduct: 2,
        name: 'test',
        optLock: 1,
      } as Shopping;
      spyOn(apiService, 'createShopping').and.returnValue(of(shopping) as any);
      actions$ = hot('-a', {
        a: saveShopping({ shopping }),
      });

      // when
      expect(effects.saveShopping$).toBeObservable(
        // then
        hot('-(bc)', {
          b: {
            type: '[Shopping] Save Shopping Success',
          },
          c: {
            type: '[Shopping] Navigate to Shopping List',
          },
        })
      );
    });

    it('should dispatch saveShoppingActionSuccess when update Shopping', () => {
      // given
      const shopping = {
        idShopping: 2,
        idProduct: 2,
        name: 'test',
        optLock: 1,
      } as Shopping;
      spyOn(apiService, 'updateShopping').and.returnValue(of(shopping) as any);

      actions$ = hot('-a', {
        a: saveShopping({ shopping }),
      });

      // when
      expect(effects.saveShopping$).toBeObservable(
        // then
        hot('-(bc)', {
          b: {
            type: '[Shopping] Save Shopping Success',
          },
          c: {
            type: '[Shopping] Navigate to Shopping List',
          },
        })
      );
    });

    it('should dispatch saveShoppingActionError when backend returns error when save Shopping', () => {
      // given
      const shopping = {
        idShopping: undefined,
        idProduct: 2,
        name: 'test',
        optLock: 1,
      } as Shopping;
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'createShopping').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(saveShopping({ shopping }));

      // when
      effects.saveShopping$.subscribe((action) => {
        // then
        expect(apiService.createShopping).toHaveBeenCalledWith(shopping);
        expect(action).toEqual({
          type: '[Shopping] Save Shopping Error',
          error,
        });
      });
    });
    it('should dispatch saveShoppingActionError when backend returns error when update Shopping', () => {
      // given
      const shopping = {
        idShopping: 2,
        idProduct: 2,
        name: 'test',
        optLock: 1,
      } as Shopping;
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'updateShopping').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(saveShopping({ shopping }));

      // when
      effects.saveShopping$.subscribe((action) => {
        // then
        expect(apiService.updateShopping).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Shopping] Save Shopping Error',
          error,
        });
      });
    });
  });
  describe('loadShopping$', () => {
    it('should dispatch retrievedShoppingActionSuccess when backend return Shopping object', () => {
      // given
      const shopping = {
        idShopping: 1,
        idProduct: 2,
        name: 'test',
        optLock: 12,
        count: 3,
      } as Shopping;
      spyOn(apiService, 'getShopping').and.returnValue(of(shopping) as any);
      actions$ = of(loadShoppingAction({ id: 2 }));

      // when
      effects.loadShopping$.subscribe((action) => {
        // then
        expect(apiService.getShopping).toHaveBeenCalledWith(2);
        expect(action).toEqual({
          type: '[Shopping] Retrieved Shopping Action Success',
          shopping: shopping,
        });
      });
    });

    it('should dispatch retrievedShoppingActionError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getShopping').and.returnValue(throwError(() => error));
      actions$ = of(loadShoppingAction({ id: 4 }));

      // when
      effects.loadShopping$.subscribe((action) => {
        // then
        expect(apiService.getShopping).toHaveBeenCalledWith(4);
        expect(action).toEqual({
          type: '[Shopping] Shopping Error',
          error,
        });
      });
    });
  });
});
