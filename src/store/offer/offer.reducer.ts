import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../../core/models/offers';
import {createReducer, on} from '@ngrx/store';
import {loadOffersData, loadOffersDataFailure, loadOffersDataSuccess} from '../app/app.actions';
import {OffersState} from '../../core/models/offers-state';

export const offersAdapter: EntityAdapter<OfferPreview> = createEntityAdapter<OfferPreview>();

const initialState: OffersState =   offersAdapter.getInitialState(
  {
    isLoading: false,
    error: null,
  }
)

export const offerReducer = createReducer(
  initialState,
  on(loadOffersData, (state) => ({
    ...state, isLoading: true
  })),
  on(loadOffersDataSuccess, (state, {offers}) => ({
    ...offersAdapter.setAll(offers, {...state}), isLoading: false
  })),
  on(loadOffersDataFailure, (state) => ({
    ...state, isLoading: false
  })),
);
