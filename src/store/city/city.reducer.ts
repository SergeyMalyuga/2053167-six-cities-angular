import { createReducer, on } from '@ngrx/store';
import { DEFAULT_CITY } from '../../core/constants/const';
import { CityState } from '../../core/models/city-state';
import { changeCity } from './actions/city.actions';

const initialState: CityState = {
  currentCity: DEFAULT_CITY,
};

export const cityReducer = createReducer(
  initialState,
  on(changeCity, (state, { city }) => ({
    ...state,
    currentCity: city,
  }))
);
