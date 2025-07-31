import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { registerLocaleData } from '@angular/common';
import ro from '@angular/common/locales/ro';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ngZorroConfig, ngZorroIcons, ngZorroI18n } from './providers/ng-zorro.providers';

registerLocaleData(ro);

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { reducers } from './store/app.reducers';
import { IssueEffects } from './store/issues/issue.effects';
import { LocationEffects } from './store/location/location.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideStore(reducers),
    provideEffects([IssueEffects, LocationEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(FormsModule),
    ngZorroConfig,
    ngZorroIcons,
    ngZorroI18n,
  ],
};
