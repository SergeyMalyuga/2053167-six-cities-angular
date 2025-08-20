import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Offer, OfferPreview} from '../types/offers';
import {createReducer, on} from '@ngrx/store';
import {
  changeCity,
  changeFavoriteStatus,
  changeFavoriteStatusFailure,
  changeFavoriteStatusSuccess,
  checkAuthorizationStatus,
  checkAuthorizationStatusFailure,
  checkAuthorizationStatusSuccess,
  loadFavoriteOffersData,
  loadFavoriteOffersDataSuccess,
  loadOffersData,
  loadOffersDataFailure,
  loadOffersDataSuccess,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess
} from './app.actions';
import {AuthorizationStatus} from '../const';
import {InitialStateApp} from '../types/initial-state-app';

export const offersAdapter: EntityAdapter<OfferPreview> = createEntityAdapter<OfferPreview>();
export const favoriteOffersAdapter: EntityAdapter<Offer> = createEntityAdapter();

const initialState: InitialStateApp = {
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  favoriteOffers: favoriteOffersAdapter.getInitialState(
    {
      isLoading: false,
      error: null,
    }
  ),
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
    ...state
  })),
  on(logout, (state) => ({
    ...state, user: undefined, authorizationStatus: AuthorizationStatus.NoAuth
  })),
  on(logoutSuccess, (state) => ({
    ...state, user: undefined, authorizationStatus: AuthorizationStatus.NoAuth
  })),
  on(logoutFailure, (state) => ({
    ...state
  })),
  on(loadFavoriteOffersData, state => ({
    ...state
  })),
  on(loadFavoriteOffersDataSuccess, (state, {favoriteOffers}) => ({
    ...state, favoriteOffers: favoriteOffersAdapter.setAll(favoriteOffers, {...state.favoriteOffers})
  })),
  on(loadOffersDataFailure, (state) => ({
    ...state
  })),
  on(changeFavoriteStatus, (state) => ({
    ...state
  })),
  on(changeFavoriteStatusSuccess, (state, {favoriteOffers, offer}) => ({
    ...state, offers: offersAdapter.updateOne({id: offer.id, changes: {isFavorite: offer.isFavorite}}, {...state.offers}), favoriteOffers: favoriteOffersAdapter.setAll(favoriteOffers, {...state.favoriteOffers})
  })),
  on(changeFavoriteStatusFailure, (state) => ({
    ...state
  }))
);

