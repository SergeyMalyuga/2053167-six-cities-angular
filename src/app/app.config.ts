import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {rootReducer} from '../store/reducers/app.reducer';
import {AppAuthEffects} from '../store/effects/app-auth.effects';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AppOffersEffects} from '../store/effects/app-offers.effects';
import {AuthInterceptor} from '../core/interceptors/auth.interceptor';
import {AppLoginEffects} from '../store/effects/app-login.effects';
import {AppLogoutEffects} from '../store/effects/app-logout.effects';
import {AppFavoriteOffersEffects} from '../store/effects/app-favorite-offers.effects';
import {AppChangeOfferStatusEffects} from '../store/effects/app-change-offer-status.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(rootReducer),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideEffects(AppAuthEffects, AppOffersEffects, AppLoginEffects,
      AppLogoutEffects, AppFavoriteOffersEffects, AppChangeOfferStatusEffects)]
};
