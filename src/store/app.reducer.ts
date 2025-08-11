import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../types/offers';
import {createReducer, on} from '@ngrx/store';
import {changeCity, loadOffersData} from './app.actions';

export const offersAdapter: EntityAdapter<OfferPreview> = createEntityAdapter<OfferPreview>();

const initialState = {
  offers: offersAdapter.getInitialState(
    {
      isLoading: false,
      error: null,
    }
  ),
  currentCity: {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 10
    }
  }
};

export const appReducer = createReducer(
  initialState,
  on(loadOffersData, (state, {offers}) => ({
    ...state, offers: offersAdapter.setAll(offers, {...state.offers})
  })),
  on(changeCity, (state, {city}) => ({
    ...state, currentCity: city
  }))
);
