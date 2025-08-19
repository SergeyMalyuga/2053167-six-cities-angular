// store/local-storage.ts
import { ActionReducer } from '@ngrx/store';

import { AppState } from './app.state';
import {localStorageSync} from 'ngrx-store-localstorage'; // Добавьте этот интерфейс

export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return localStorageSync({
    keys: [
      {
        app: ['authorizationStatus', 'user', 'currentCity'] // Укажите путь через app
      }
    ],
    rehydrate: true,
    storage: localStorage
  })(reducer);
}
