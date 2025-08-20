import {City} from '../types/city';
import {OffersState} from './offers.state';
import {AuthorizationStatus} from '../const';
import {User} from '../types/user';
import {FavoriteOffersState} from './offers-favorite.state';

export interface AppState {
  authorizationStatus: AuthorizationStatus;
  isLoading: boolean;
  user: User | undefined;
  currentCity: City;
  favoriteOffers: FavoriteOffersState;
  offers: OffersState;
}
