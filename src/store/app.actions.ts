import {createAction, props} from '@ngrx/store';
import {OfferPreview} from '../types/offers';
import {City} from '../types/city';
import {User} from '../types/user';

export const loadOffersData = createAction('[App component] Set all offers]', props<{ offers: OfferPreview[] }>());
export const changeCity = createAction('[Main page component] Change city]', props<{ city: City }>());

export const checkAuthorizationStatus = createAction('[Main page component] Check authorization status')
export const checkAuthorizationStatusSuccess = createAction('[Main page component] Check authorization status successfully', props<{
  user: User
}>());
export const checkAuthorizationStatusFailure = createAction('[Main page component] Check authorization status failure');
