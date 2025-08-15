import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../types/offers';
import {createReducer, on} from '@ngrx/store';
import {
  changeCity, checkAuthorizationStatus,
  checkAuthorizationStatusFailure,
  checkAuthorizationStatusSuccess,
  loadOffersData
} from './app.actions';
import {AuthorizationStatus} from '../const';
import {InitialStateApp} from '../types/initial-state-app';

export const offersAdapter: EntityAdapter<OfferPreview> = createEntityAdapter<OfferPreview>();

const initialState: InitialStateApp = {
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
  on(loadOffersData, (state, {offers}) => ({
    ...state, offers: offersAdapter.setAll(offers, {...state.offers})
  })),
  on(changeCity, (state, {city}) => ({
    ...state, currentCity: city
  })),
  on(checkAuthorizationStatus, (state) => ({
    ...state, isLoading: true
  })),
  on(checkAuthorizationStatusSuccess, (state, {user}) => ({
    ...state, user: user, authorizationStatus: AuthorizationStatus.Auth, isLoading: false
  })),
  on(checkAuthorizationStatusFailure, (state) => ({
    ...state, authorizationStatus: AuthorizationStatus.NoAuth, isLoading: false
  })));

