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
import { StorageEffects } from './storage.effects';
import { Storage } from '../../api';
import {
  navigateToStorageEdit,
  navigateToStorageList,
  navigateToStorageNew,
  retrieveStorageList,
  saveStorage,
} from './storage.action';
import { hot } from 'jasmine-marbles';

describe('StorageEffects', () => {
  let apiService: ApiService;
  let actions$: Observable<Action>;
  let effects: StorageEffects;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        StorageEffects,
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

    effects = TestBed.inject(StorageEffects);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  describe('loadStorages$', () => {
    it('should dispatch retrievedStorageListActionSuccess when backend return Storages', () => {
      // given
      const storages = [
        {
          idStorage: 2,
          idCategory: 12,
          idProduct: 4,
          idUnit: 443,
          optLock: 49,
          used: 8,
        },
      ] as Storage[];
      spyOn(apiService, 'getStorages').and.returnValue(of(storages) as any);
      actions$ = of(retrieveStorageList());

      // when
      effects.loadStorages$.subscribe((action) => {
        // then
        expect(apiService.getStorages).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Storage] Retrieved Storage list',
          storages: storages,
        });
      });
    });

    it('should dispatch retrievedCategoryListActionError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getStorages').and.returnValue(throwError(() => error));
      actions$ = of(retrieveStorageList());

      // when
      effects.loadStorages$.subscribe((action) => {
        // then
        expect(apiService.getStorages).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Storage] Storage list Error',
          error,
        });
      });
    });
  });
  describe('saveStorage$', () => {
    it('should dispatch saveStorageActionSuccess when update Storage', () => {
      // given
      const storage = {
        idStorage: 1,
        idUnit: 4,
        idProduct: 91,
        idCategory: 41,
        idInventory: 3,
        insertDate: '2021-09-21',
        validDate: '2021-09-21',
      } as Storage;
      spyOn(apiService, 'updateStorage').and.returnValue(of(storage) as any);

      actions$ = hot('-a', {
        a: saveStorage({ storage }),
      });

      // when
      expect(effects.saveStorage$).toBeObservable(
        // then
        hot('-(bcdef)', {
          b: {
            type: '[Storage] Save StorageSuccess',
          },
          c: {
            type: '[Storage] Set CategoryId',
            idCategory: 0,
          },
          d: {
            type: '[Storage] Set InventoryId',
            idInventory: 0,
          },
          e: {
            type: '[Storage] Set ProductId',
            idProduct: 0,
          },
          f: {
            type: '[Storage] Navigate to Storage',
          },
        })
      );
    });

    it('should dispatch saveStorageActionSuccess when create Storage', () => {
      // given
      const storage = {
        idStorage: undefined,
        idUnit: 4,
        idProduct: 91,
        idCategory: 41,
        idInventory: 3,
        insertDate: '2021-09-21',
        validDate: '2021-09-21',
      } as Storage;
      spyOn(apiService, 'createStorage').and.returnValue(of(storage) as any);

      actions$ = hot('-a', {
        a: saveStorage({ storage }),
      });

      // when
      expect(effects.saveStorage$).toBeObservable(
        // then
        hot('-(bcdef)', {
          b: {
            type: '[Storage] Save StorageSuccess',
          },
          c: {
            type: '[Storage] Set CategoryId',
            idCategory: 0,
          },
          d: {
            type: '[Storage] Set InventoryId',
            idInventory: 0,
          },
          e: {
            type: '[Storage] Set ProductId',
            idProduct: 0,
          },
          f: {
            type: '[Storage] Navigate to Storage',
          },
        })
      );
    });

    it('should dispatch saveStorageActionError when save backend returns error', () => {
      // given
      const storage = {
        idStorage: undefined,
        idUnit: 4,
        idProduct: 91,
        idCategory: 41,
        idInventory: 3,
        insertDate: '2021-09-21',
        validDate: '2021-09-21',
      } as Storage;
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'createStorage').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(saveStorage({ storage }));

      // when
      effects.saveStorage$.subscribe((action) => {
        // then
        expect(action).toEqual({
          type: '[Storage] Save StorageError',
          error,
        });
      });
    });

    it('should dispatch saveStorageActionError when update backend returns error', () => {
      // given
      const storage = {
        idStorage: 1,
        idUnit: 4,
        idProduct: 91,
        idCategory: 41,
        idInventory: 3,
        insertDate: '2021-09-21',
        validDate: '2021-09-21',
      } as Storage;
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'updateStorage').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(saveStorage({ storage }));

      // when
      effects.saveStorage$.subscribe((action) => {
        // then
        expect(action).toEqual({
          type: '[Storage] Save StorageError',
          error,
        });
      });
    });
  });
  describe('newStorage$', () => {
    it('should navigate to storage-add', () => {
      // given
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToStorageNew());

      // when
      effects.newStorage$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/storages-add']);
    });
  });
  describe('editStorage$', () => {
    it('should navigate to storages-add component', () => {
      // given
      const storage = {
        idStorage: 71,
        idUnit: 4,
        idProduct: 91,
        idCategory: 41,
        idInventory: 3,
        insertDate: '2021-09-21',
        validDate: '2021-09-21',
      } as Storage;
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToStorageEdit({ storage }));

      // when
      effects.editStorage$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/storages-add', 71]);
    });
  });
  describe('openStorageList$', () => {
    it('should navigate to storages component', () => {
      // given
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToStorageList());

      // when
      effects.openStorageList$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/storages']);
    });
  });
});
