import {createAction, props} from '@ngrx/store';
import {OfferPreview} from '../types/offers';
import {City} from '../types/city';

export const loadOffersData = createAction('[App component] Set all offers]', props<{ offers: OfferPreview[] }>());
export const changeCity = createAction('[Main page component] Change city]', props<{city: City}>());
