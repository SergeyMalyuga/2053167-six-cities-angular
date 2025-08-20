import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './app.state';
import {favoriteOffersAdapter, offersAdapter} from './app.reducer';


const selectAppState = createFeatureSelector<AppState>('appStore')

export const selectOffersState = createSelector(
  selectAppState,
  (state: AppState) => state.offers
);

export const selectFavoriteOffers = createSelector(
  selectAppState,
  (state: AppState) => state.favoriteOffers
);

const offersSelectors = offersAdapter.getSelectors();
const favoriteOffersSelectors = favoriteOffersAdapter.getSelectors();


export const selectAllOffers = createSelector(
  selectOffersState,
  offersSelectors.selectAll
);

export const selectAllFavoriteOffers = createSelector(
  selectFavoriteOffers,
  favoriteOffersSelectors.selectAll
);

export const selectCity = createSelector(
  selectAppState,
  (state: AppState) => state.currentCity
);

export const selectUser = createSelector(
  selectAppState,
  (state: AppState) => state.user
);
