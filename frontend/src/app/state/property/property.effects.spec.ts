import { ApiService } from '../../services/api.service';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { PropertyEffects } from './property.effects';
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
import { Property } from '../../api';
import { retrievePropertyForUser, saveProperty } from './property.action';
import { hot } from 'jasmine-marbles';

describe('PropertyEffects', () => {
  let apiService: ApiService;
  let actions$: Observable<Action>;
  let effects: PropertyEffects;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        PropertyEffects,
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

    effects = TestBed.inject(PropertyEffects);
    apiService = TestBed.inject(ApiService);
  });
  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  describe('loadProperty$', () => {
    it('should dispatch retrievedPropertyForUserActionSuccess when backend return Properties', () => {
      // given
      const property = {
        idProperty: 1,
        idUser: 1,
        currency: 'currency',
        language: 'language',
      } as Property;
      spyOn(apiService, 'getProperty').and.returnValue(of(property) as any);
      actions$ = of(retrievePropertyForUser({ idUser: 1 }));

      // when
      effects.loadProperty$.subscribe((action) => {
        // then
        expect(apiService.getProperty).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Property] Retrieved Property',
          property: property,
        });
      });
    });
    it('should dispatch retrievedPropertyForUserActionError when backend returns error', () => {
      // given
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'getProperty').and.returnValue(throwError(() => error));
      actions$ = of(retrievePropertyForUser({ idUser: 1 }));

      // when
      effects.loadProperty$.subscribe((action) => {
        // then
        expect(apiService.getProperty).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Property] Property Error',
          error,
        });
      });
    });
  });
  describe('saveProperty$', () => {
    it('should dispatch savePropertyActionSuccess when update Property', () => {
      // given
      const property = {
        idProperty: 1,
        idUser: 1,
        currency: 'currency',
        language: 'language',
      } as Property;
      spyOn(apiService, 'updateProperty').and.returnValue(of(property) as any);

      actions$ = hot('-a', {
        a: saveProperty({ property }),
      });

      // when
      expect(effects.saveProperty$).toBeObservable(
        // then
        hot('-(b)', {
          b: {
            type: '[Property] Save Property Success',
          },
        })
      );
    });

    it('should dispatch savePropertyActionSuccess when create Property', () => {
      // given
      const property = {
        idProperty: undefined,
        idUser: 1,
        currency: 'currency',
        language: 'language',
      } as Property;
      spyOn(apiService, 'createProperty').and.returnValue(of(property) as any);

      actions$ = hot('-a', {
        a: saveProperty({ property }),
      });

      // when
      expect(effects.saveProperty$).toBeObservable(
        // then
        hot('-(b)', {
          b: {
            type: '[Property] Save Property Success',
          },
        })
      );
    });

    it('should dispatch savePropertyActionError when backend returns error', () => {
      // given
      const property = {
        idProperty: undefined,
        idUser: 1,
        currency: 'currency',
        language: 'language',
      } as Property;
      const error = new HttpErrorResponse({});
      spyOn(apiService, 'createProperty').and.returnValue(
        throwError(() => error)
      );
      actions$ = of(saveProperty({ property }));

      // when
      effects.saveProperty$.subscribe((action) => {
        // then
        expect(apiService.createProperty).toHaveBeenCalled();
        expect(action).toEqual({
          type: '[Property] Save Property Error',
          error,
        });
      });
    });
  });
});
