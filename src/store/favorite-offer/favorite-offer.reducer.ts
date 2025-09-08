import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { OfferPreview } from '../../core/models/offers';
import { createReducer, on } from '@ngrx/store';
import { FavoriteOffersState } from '../../core/models/offers-favorite-state';
import * as actions from './actions/favorite-offer.actions';

export const favoriteOffersAdapter: EntityAdapter<OfferPreview> =
  createEntityAdapter<OfferPreview>();

const initialState: FavoriteOffersState = favoriteOffersAdapter.getInitialState(
  {
    isLoading: false,
    error: null,
  }
);

export const favoriteOffersReducer = createReducer(
  initialState,
  on(actions.loadFavoriteOffersData, state => ({
    ...state,
    isLoading: true,
  })),
  on(actions.loadFavoriteOffersDataSuccess, (state, { favoriteOffers }) => ({
    ...favoriteOffersAdapter.setAll(favoriteOffers, {
      ...state,
      isLoading: false,
    }),
  })),
  on(actions.loadFavoriteOffersDataFailure, state => ({
    ...state,
    isLoading: false,
  })),
  on(actions.changeFavoriteStatus, state => ({
    ...state,
    isLoading: true,
  })),
  on(actions.changeFavoriteStatusSuccess, (state, { favoriteOffers }) => ({
    ...favoriteOffersAdapter.setAll(favoriteOffers, {
      ...state,
      isLoading: false,
    }),
  })),
  on(actions.changeFavoriteStatusFailure, state => ({
    ...state,
    isLoading: false,
  }))
);
