import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { rootReducer } from '../store/app/app.reducer';
import { AppAuthEffects } from '../store/user/app-auth.effects';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppOffersEffects } from '../store/offer/app-offers.effects';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { AppLoginEffects } from '../store/user/app-login.effects';
import { AppLogoutEffects } from '../store/user/app-logout.effects';
import { AppFavoriteOffersEffects } from '../store/favorite-offer/app-favorite-offers.effects';
import { AppChangeOfferStatusEffects } from '../store/offer/app-change-offer-status.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(rootReducer),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideEffects(
      AppAuthEffects,
      AppOffersEffects,
      AppLoginEffects,
      AppLogoutEffects,
      AppFavoriteOffersEffects,
      AppChangeOfferStatusEffects
    ),
  ],
};
