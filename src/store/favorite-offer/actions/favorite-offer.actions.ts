import { createAction, props } from '@ngrx/store';
import { Offer, OfferPreview } from '../../../core/models/offers';

export const loadFavoriteOffersData = createAction(
  '[App component] Set all offers (favorite)'
);
export const loadFavoriteOffersDataSuccess = createAction(
  '[App component] Set all offers (favorite) success',
  props<{ favoriteOffers: OfferPreview[] }>()
);
export const loadFavoriteOffersDataFailure = createAction(
  '[App component] Set all offers (favorite) failure'
);

export const changeFavoriteStatus = createAction(
  '[Card component] Change status',
  props<{ id: string | undefined; status: number }>()
);
export const changeFavoriteStatusSuccess = createAction(
  '[Card component] Change status success',
  props<{ favoriteOffers: OfferPreview[]; offer: Offer }>()
);
export const changeFavoriteStatusFailure = createAction(
  '[Card component] Change status failure'
);
