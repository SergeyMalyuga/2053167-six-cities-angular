import {createAction, props} from '@ngrx/store';
import {Offer, OfferPreview} from '../types/offers';
import {City} from '../types/city';
import {User} from '../types/user';

export const loadOffersData = createAction('[App component] Load all offers]');
export const loadOffersDataSuccess = createAction('[App component] Set all offers]', props<{ offers: OfferPreview[] }>());
export const loadOffersDataFailure = createAction('[App component] Set all offers (error)')

export const loadFavoriteOffersData = createAction('[App component] Set all offers (favorite)');
export const loadFavoriteOffersDataSuccess = createAction('[App component] Set all offers (favorite) success', props<{favoriteOffers: Offer[]}>());
export const loadFavoriteOffersDataFailure = createAction('[App component] Set all offers (favorite) failure');

export const changeFavoriteStatus = createAction('[Card component] Change status', props<{id: string | undefined, status: number}>());
export const changeFavoriteStatusSuccess = createAction('[Card component] Change status success', props<{favoriteOffers: Offer[], offer: Offer}>());
export const changeFavoriteStatusFailure = createAction('[Card component] Change status failure');

export const logout = createAction('[Header component] Logout');
export const logoutSuccess = createAction('[Header component] Logout Success');
export const logoutFailure = createAction('[Header component] Logout Failure');

export const changeCity = createAction('[Main page component] Change city]', props<{ city: City }>());

export const checkAuthorizationStatus = createAction('[Main page component] Check authorization status')
export const checkAuthorizationStatusSuccess = createAction('[Main page component] Check authorization status successfully', props<{
  user: User
}>());
export const checkAuthorizationStatusFailure = createAction('[Main page component] Check authorization status failure');

export const loginAction = createAction('[Login page component] Login action', props<{email: string, password: string}>());
export const loginSuccess = createAction('[Login page component] Login Successfully', props<{user: User}>());
export const loginFailure = createAction('[Login page component] Login failure');
