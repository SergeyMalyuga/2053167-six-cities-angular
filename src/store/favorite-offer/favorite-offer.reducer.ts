import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../../core/models/offers';
import {createReducer, on} from '@ngrx/store';
import {
  changeFavoriteStatus,
  changeFavoriteStatusFailure,
  changeFavoriteStatusSuccess,
  loadFavoriteOffersData,
  loadFavoriteOffersDataSuccess,
  loadOffersDataFailure
} from '../app/app.actions';
import {offersAdapter} from '../app/app.reducer';
import {FavoriteOffersState} from '../../core/models/offers-favorite.state';

export const favoriteOffersAdapter: EntityAdapter<OfferPreview> = createEntityAdapter<OfferPreview>();

const initialState: FavoriteOffersState  = favoriteOffersAdapter.getInitialState(
  {
    isLoading: false,
    error: null,
  }
);

export const favoriteOffersReducer = createReducer(
  initialState,
  on(loadFavoriteOffersData, state => ({
    ...state
  })),
  on(loadFavoriteOffersDataSuccess, (state, {favoriteOffers}) => ({
    ...favoriteOffersAdapter.setAll(favoriteOffers, {...state})
  })),
  on(loadOffersDataFailure, (state) => ({
    ...state
  })),
  on(changeFavoriteStatus, (state) => ({
    ...state
  })),
  on(changeFavoriteStatusSuccess, (state, {favoriteOffers, offer}) => ({
    ...state,
    offers: offersAdapter.updateOne({id: offer.id, changes: {isFavorite: offer.isFavorite}}, {...state}),
    ...favoriteOffersAdapter.setAll(favoriteOffers, {...state})
  })),
  on(changeFavoriteStatusFailure, (state) => ({
    ...state
  }))
)
