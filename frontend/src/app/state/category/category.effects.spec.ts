import { CategoryEffects } from './category.effects';
import { ApiService } from '../../services/api.service';
import { Observable, of, throwError } from 'rxjs';
import { Category } from '../../api';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Router } from '@angular/router';
import {
  loadCategoryAction,
  navigateToCategoryEdit,
  navigateToCategoryList,
  navigateToCategoryNew,
  retrieveCategoryList,
  saveCategory,
} from './category.action';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
} from '@angular/common/http';
import { hot } from 'jasmine-marbles';
import { Action } from '@ngrx/store';

describe('CategoryEffects', () => {
  let apiService: ApiService;
  let actions$: Observable<Action>;
  let effects: CategoryEffects;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        CategoryEffects,
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

    effects = TestBed.inject(CategoryEffects);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadCategories$', () => {
    it('should dispatch retrievedCategoryListActionSuccess when backend return Categories', () => {
      // given
      const categories = [
        {
          idCategory: 2,
          name: 'test',
          active: true,
          optLock: 1,
        },
      ] as Category[];
      spyOn(apiService, 'getCategories').and.returnValue(of(categories) as any);
      actions$ = of(retrieveCategoryList());

      // when
      effects.loadCategories$.subscribe((action) => {
        // then
        expect(apiService.getCategories).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Category] Retrieved Category list',
          categories: categories,
        });
      });
    });

    it('should dispatch retrievedCategoryListActionError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getCategories').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveCategoryList());

      // when
      effects.loadCategories$.subscribe((action) => {
        // then
        expect(apiService.getCategories).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Category] Category list Error',
          error,
        });
      });
    });
  });

  describe('save$', () => {
    it('should dispatch saveCategoryActionSuccess when update Category', () => {
      // given
      const category = {
        idCategory: 2,
        name: 'test',
        active: true,
        optLock: 1,
      } as Category;
      spyOn(apiService, 'updateCategory').and.returnValue(of(category) as any);

      actions$ = hot('-a', {
        a: saveCategory({ category }),
      });

      // when
      expect(effects.save$).toBeObservable(
        // then
        hot('-(bc)', {
          b: {
            type: '[Category] Save CategorySuccess',
          },
          c: {
            type: '[Category] Navigate Category list',
          },
        })
      );
    });

    it('should dispatch saveCategoryActionSuccess when create Category', () => {
      // given
      const category = {
        idCategory: undefined,
        name: 'test',
        active: true,
        optLock: 1,
      } as Category;
      spyOn(apiService, 'createCategory').and.returnValue(of(category) as any);

      actions$ = hot('-a', {
        a: saveCategory({ category }),
      });

      // when
      expect(effects.save$).toBeObservable(
        // then
        hot('-(bc)', {
          b: {
            type: '[Category] Save CategorySuccess',
          },
          c: {
            type: '[Category] Navigate Category list',
          },
        })
      );
    });

    it('should dispatch saveCategoryActionError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'createCategory').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveCategoryList());

      // when
      effects.save$.subscribe((action) => {
        // then
        expect(apiService.createCategory).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Category] Save CategoryError',
          error,
        });
      });
    });

    it('should dispatch saveCategoryActionError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'updateCategory').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(retrieveCategoryList());

      // when
      effects.save$.subscribe((action) => {
        // then
        expect(apiService.updateCategory).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Category] Save CategoryError',
          error,
        });
      });
    });
  });

  describe('loadCategory$', () => {
    it('should dispatch retrievedCategoryActionSuccess when backend return Category object', () => {
      // given
      const category = {
        idCategory: 2,
        name: 'test',
        active: true,
        optLock: 1,
      } as Category;
      spyOn(apiService, 'getCategory').and.returnValue(of(category) as any);
      actions$ = of(loadCategoryAction({ id: 2 }));

      // when
      effects.loadCategory$.subscribe((action) => {
        // then
        expect(apiService.getCategory).toHaveBeenCalledWith(2);
        expect(action).toEqual({
          type: '[Category] Load Category Success Action',
          category: category,
        });
      });
    });

    it('should dispatch retrievedCategoryListActionError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getCategory').and.returnValue(throwError(() => error));
      actions$ = of(loadCategoryAction({ id: 2 }));

      // when
      effects.loadCategory$.subscribe((action) => {
        // then
        expect(apiService.getCategory).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Category] Retrieve Category Error',
          error,
        });
      });
    });
  });

  describe('openCategoryList$', () => {
    it('should navigate to categories component', () => {
      // given
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToCategoryList());

      // when
      effects.openCategoryList$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/categories']);
    });
  });

  describe('newCategory$', () => {
    it('should navigate to category-add', () => {
      // given
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToCategoryNew());

      // when
      effects.newCategory$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/category-add']);
    });
  });

  describe('editCategory$', () => {
    it('should navigate to category-add component', () => {
      // given
      const category = {
        idCategory: 2,
        name: 'test',
        active: true,
        optLock: 1,
      } as Category;
      let service = TestBed.inject(Router);
      spyOn(service, 'navigate');
      actions$ = of(navigateToCategoryEdit({ category }));

      // when
      effects.editCategory$.subscribe();

      // then
      expect(service.navigate).toHaveBeenCalledWith(['/category-add', 2]);
    });
  });
});
