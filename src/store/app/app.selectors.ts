import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {favoriteOffersAdapter, offersAdapter} from './app.reducer';


const selectUserState = createFeatureSelector<AppState['user']>('user');
const selectFavoriteOffersState = createFeatureSelector<AppState['favoriteOffers']>('favoriteOffers');
const selectOffersState = createFeatureSelector<AppState['offers']>('offers');
const selectCityState = createFeatureSelector<AppState['currentCity']>('currentCity');

const offersSelectors = offersAdapter.getSelectors();
const favoriteOffersSelectors = favoriteOffersAdapter.getSelectors();

export const selectAllOffers = createSelector(
  selectOffersState,
  offersSelectors.selectAll
);

export const selectAllFavoriteOffers = createSelector(
  selectFavoriteOffersState,
  favoriteOffersSelectors.selectAll
);

export const selectCity = createSelector(
  selectCityState,
  state => state.currentCity
);

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const selectAuthorizationStatus = createSelector(
  selectUserState,
  (state) => state.authorizationStatus
);
