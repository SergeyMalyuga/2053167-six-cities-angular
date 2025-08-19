import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {appReducer} from '../store/app.reducer';
import {AppAuthEffects} from '../store/app-auth.effects';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AppOffersEffects} from '../store/app-offers.effects';
import {AuthInterceptor} from '../interceptors/auth.interceptor';
import {AppLoginEffects} from '../store/app-login.effects';


export const appConfig: ApplicationConfig = {
  providers: [

    provideRouter(routes),
    provideStore({ appStore: appReducer }),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideEffects(AppAuthEffects, AppOffersEffects, AppLoginEffects)]
};
