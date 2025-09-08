import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { OfferPreview } from '../../core/models/offers';
import { createReducer, on } from '@ngrx/store';
import { OffersState } from '../../core/models/offers-state';
import * as effectActions from './actions/effect.actions';
import * as favoriteOfferActions from '../favorite-offer/actions/favorite-offer.actions';

export const offersAdapter: EntityAdapter<OfferPreview> =
  createEntityAdapter<OfferPreview>();

const initialState: OffersState = offersAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const offerReducer = createReducer(
  initialState,
  on(effectActions.loadOffersData, state => ({
    ...state,
    isLoading: true,
  })),
  on(effectActions.loadOffersDataSuccess, (state, { offers }) => ({
    ...offersAdapter.setAll(offers, { ...state, isLoading: false }),
  })),
  on(effectActions.loadOffersDataFailure, state => ({
    ...state,
    isLoading: false,
  })),
  on(favoriteOfferActions.changeFavoriteStatus, state => ({
    ...state,
  })),
  on(favoriteOfferActions.changeFavoriteStatusSuccess, (state, { offer }) => {
    return offersAdapter.updateOne(
      {
        id: offer.id,
        changes: { isFavorite: offer.isFavorite },
      },
      {
        ...state,
        error: null,
      }
    );
  })
);
