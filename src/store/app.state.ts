import {City} from '../types/city';
import {OffersState} from './offers.state';

export interface AppState {
  currentCity: City;
  offers: OffersState;
}
