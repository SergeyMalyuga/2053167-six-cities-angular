import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../types/offers';
import {ActionReducerMap, createReducer, on} from '@ngrx/store';
import {
  changeCity, checkAuthorizationStatus,
  checkAuthorizationStatusFailure,
  checkAuthorizationStatusSuccess,
  loadOffersData, loadOffersDataFailure, loadOffersDataSuccess, loginFailure, loginSuccess
} from './app.actions';
import {AuthorizationStatus} from '../const';
import {InitialStateApp} from '../types/initial-state-app';

export const offersAdapter: EntityAdapter<OfferPreview> = createEntityAdapter<OfferPreview>();

const initialState: InitialStateApp = {
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  offers: offersAdapter.getInitialState(
    {
      isLoading: false,
      error: null,
    }
  ),
  currentCity: {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 10
    }
  }
};

export const appReducer = createReducer(
    initialState,
    on(loadOffersData, (state) => ({
      ...state, isLoading: true
    })),
    on(loadOffersDataSuccess, (state, {offers}) => ({
      ...state, offers: offersAdapter.setAll(offers, {...state.offers}), isLoading: false
    })),
    on(loadOffersDataFailure, (state) => ({
      ...state, isLoading: false
    })),
    on(changeCity, (state, {city}) => ({
      ...state, currentCity: city
    })),
    on(checkAuthorizationStatus, (state) => ({
      ...state
    })),
    on(checkAuthorizationStatusSuccess, (state, {user}) => ({
      ...state, user, authorizationStatus: AuthorizationStatus.Auth
    })),
    on(checkAuthorizationStatusFailure, (state) => ({
      ...state, authorizationStatus: AuthorizationStatus.NoAuth
    })),
    on(loginSuccess, (state, {user}) => ({
      ...state, user, authorizationStatus: AuthorizationStatus.Auth
    })),
    on(loginFailure, (state) => ({
      ...state, authorizationStatus: AuthorizationStatus.NoAuth
    }))
  );

export interface AppState {
  app: InitialStateApp;
}

export const reducers: ActionReducerMap<AppState> = {
  app: appReducer // Ключ 'app' вместо 'appStore'
};
