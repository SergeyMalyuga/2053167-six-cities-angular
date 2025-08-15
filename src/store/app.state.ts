import {City} from '../types/city';
import {OffersState} from './offers.state';
import {AuthorizationStatus} from '../const';
import {User} from '../types/user';

export interface AppState {
  authorizationStatus: AuthorizationStatus;
  user: User | undefined;
  currentCity: City;
  offers: OffersState;
}
