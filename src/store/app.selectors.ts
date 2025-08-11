import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './app.state';
import {offersAdapter} from './app.reducer';


const selectAppState = createFeatureSelector<AppState>('appStore')
export const selectOffersState = createSelector(
  selectAppState,
  (state: AppState) => state.offers
);

const s = offersAdapter.getSelectors()

export const selectAllOffers = createSelector(
  selectOffersState,
  s.selectAll
)

export const selectCity = createSelector(
  selectAppState,
  (state: AppState) => state.currentCity
)
