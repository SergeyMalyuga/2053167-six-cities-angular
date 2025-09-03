import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { OfferPreview } from '../../core/models/offers';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { userReducer } from '../user/user.reducer';
import { offerReducer } from '../offer/offer.reducer';
import { favoriteOffersReducer } from '../favorite-offer/favorite-offer.reducer';
import { cityReducer } from '../city/city.reducer';

export const offersAdapter: EntityAdapter<OfferPreview> =
  createEntityAdapter<OfferPreview>();
export const favoriteOffersAdapter: EntityAdapter<OfferPreview> =
  createEntityAdapter();

export const rootReducer: ActionReducerMap<AppState> = {
  user: userReducer,
  offers: offerReducer,
  favoriteOffers: favoriteOffersReducer,
  currentCity: cityReducer,
};
