import {City} from './city';
import {OffersState} from './offers.state';
import {AuthorizationStatus} from '../constants/const';
import {User} from './user';
import {FavoriteOffersState} from './offers-favorite.state';

export interface AppState {
  authorizationStatus: AuthorizationStatus;
  isLoading: boolean;
  user: User | undefined;
  currentCity: City;
  favoriteOffers: FavoriteOffersState;
  offers: OffersState;
}
