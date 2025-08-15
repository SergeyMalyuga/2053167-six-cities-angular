import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {appReducer} from '../store/app.reducer';
import {AppAuthEffects} from '../store/app-auth.effects';
import {provideHttpClient} from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),

    provideHttpClient(),
    provideRouter(routes),
    provideStore({appStore: appReducer}),
    provideEffects(AppAuthEffects)]
};
