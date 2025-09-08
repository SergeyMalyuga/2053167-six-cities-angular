import { createAction, props } from '@ngrx/store';
import { OfferPreview } from '../../../core/models/offers';

export const loadOffersData = createAction('[App component] Load all offers]');
export const loadOffersDataSuccess = createAction(
  '[App component] Set all offers]',
  props<{ offers: OfferPreview[] }>()
);
export const loadOffersDataFailure = createAction(
  '[App component] Set all offers (error)'
);
