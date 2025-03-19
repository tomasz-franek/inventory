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
import { InventoryEffects } from './inventory.effects';
import { Inventory } from '../../api';
import {
  loadInventoryAction,
  navigateToInventoryEdit,
  navigateToInventoryList,
  navigateToInventoryNew,
  retrieveInventoryList,
  saveInventory,
} from './inventory.action';
import { hot } from 'jasmine-marbles';

describe('InventoryEffects', () => {
  let apiService: ApiService;
  let actions$: Observable<Action>;
  let effects: InventoryEffects;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        InventoryEffects,
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

    effects = TestBed.inject(InventoryEffects);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  describe('save$', () => {
    it('should dispatch saveInventoryActionSuccess when update Inventory', () => {
      // given
      const inventory = {
        idInventory: 2,
        name: 'test',
        active: true,
        optLock: 1,
      } as Inventory;
      spyOn(apiService, 'updateInventory').and.returnValue(
        of(inventory) as any
      );

      actions$ = hot('-a', {
        a: saveInventory({ inventory }),
      });

      // when
      expect(effects.save$).toBeObservable(
        // then
        hot('-(bc)', {
          b: {
            type: '[Inventory] Save InventorySuccess',
          },
          c: {
            type: '[Inventory] Navigate Inventory list',
          },
        })
      );
    });

    it('should dispatch saveInventoryActionSuccess when create Inventory', () => {
      // given
      const inventory = {
        idInventory: undefined,
        name: 'test',
        active: true,
        optLock: 1,
      } as Inventory;
      spyOn(apiService, 'createInventory').and.returnValue(
        of(inventory) as any
      );

      actions$ = hot('-a', {
        a: saveInventory({ inventory }),
      });

      // when
      expect(effects.save$).toBeObservable(
        // then
        hot('-(bc)', {
          b: {
            type: '[Inventory] Save InventorySuccess',
          },
          c: {
            type: '[Inventory] Navigate Inventory list',
          },
        })
      );
    });

    it('should dispatch saveInventoryActionError when backend save returns error', () => {
      // given
      const inventory = {
        idInventory: undefined,
        name: 'test',
        active: true,
        optLock: 1,
      } as Inventory;
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'createInventory').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(saveInventory({ inventory }));

      // when
      effects.save$.subscribe((action) => {
        // then
        expect(apiService.createInventory).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Inventory] Save InventoryError',
          error,
        });
      });
    });

    it('should dispatch saveInventoryActionError when backend update returns error', () => {
      // given
      const inventory = {
        idInventory: 1,
        name: 'test',
        active: true,
        optLock: 1,
      } as Inventory;
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'updateInventory').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(saveInventory({ inventory }));

      // when
      effects.save$.subscribe((action) => {
        // then
        expect(action).toEqual({
          type: '[Inventory] Save InventoryError',
          error,
        });
      });
    });
  });
  describe('loadInventories$', () => {
    it('should dispatch retrievedInventoryListActionSuccess when backend return Inventories', () => {
      // given
      const inventories = [
        {
          idInventory: 2,
          name: 'test',
          active: true,
          optLock: 1,
        },
      ] as Inventory[];
      spyOn(apiService, 'getInventories').and.returnValue(
        of(inventories) as any
      );
      actions$ = of(retrieveInventoryList());

      // when
      effects.loadInventories$.subscribe((action) => {
        // then
        expect(apiService.getInventories).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Inventory] Retrieved Inventory list',
          inventories: inventories,
        });
      });
    });

    it('should dispatch retrievedInventoryListActionError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getInventories').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveInventoryList());

      // when
      effects.loadInventories$.subscribe((action) => {
        // then
        expect(apiService.getInventories).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Inventory] Inventory list Error',
          error,
        });
      });
    });
  });
  describe('loadInventory$', () => {
    it('should dispatch retrievedInventoryActionSuccess when backend return Inventory object', () => {
      // given
      const inventory = {
        idInventory: 2,
        name: 'test',
        active: true,
        optLock: 1,
      } as Inventory;
      spyOn(apiService, 'getInventory').and.returnValue(of(inventory) as any);
      actions$ = of(loadInventoryAction({ id: 2 }));

      // when
      effects.loadInventory$.subscribe((action) => {
        // then
        expect(apiService.getInventory).toHaveBeenCalledWith(2);
        expect(action).toEqual({
          type: '[Inventory] Load Inventory Success Action',
          inventory: inventory,
        });
      });
    });

    it('should dispatch retrievedInventoryListActionError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getInventory').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(loadInventoryAction({ id: 2 }));

      // when
      effects.loadInventory$.subscribe((action) => {
        // then
        expect(apiService.getInventory).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Inventory] Load Inventory Error Action',
          error,
        });
      });
    });
  });
  describe('openInventoryList$', () => {
    it('should navigate to inventories component', () => {
      // given
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToInventoryList());

      // when
      effects.openInventoryList$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/inventories']);
    });
  });
  describe('newInventory$', () => {
    it('should navigate to inventory-add', () => {
      // given
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToInventoryNew());

      // when
      effects.newInventory$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/inventory-add']);
    });
  });
  describe('editInventory$', () => {
    it('should navigate to inventories component', () => {
      // given
      const inventory = {
        idInventory: 21,
        name: 'test',
        active: true,
        optLock: 1,
      } as Inventory;
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToInventoryEdit({ inventory }));

      // when
      effects.editInventory$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/inventory-add', 21]);
    });
  });
});
