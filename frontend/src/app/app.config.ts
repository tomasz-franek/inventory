import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app.routes'
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {categoryReducer} from './state/category/category.reducer';
import {inventoryReducer} from './state/inventory/inventory.reducer';
import {provideEffects} from '@ngrx/effects';
import {CategoryEffects} from './state/category/category.effects';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {provideTranslateService, TranslateLoader} from '@ngx-translate/core';
import {productReducer} from './state/product/product.reducer';
import {storageReducer} from './state/storage/storage.reducer';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideStore({
      categories: categoryReducer,
      inventories: inventoryReducer,
      products: productReducer,
      storages: storageReducer,
    }),
    provideEffects([CategoryEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en'
    })
  ]
};
