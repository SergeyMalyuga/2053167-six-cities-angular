import {AuthorizationStatus} from '../const';
import {Offer, OfferPreview} from './offers';
import {City} from './city';
import {EntityState} from '@ngrx/entity';
import {User} from './user';
import {FavoriteOffersState} from '../store/offers-favorite.state';


export interface InitialStateApp {
  authorizationStatus: AuthorizationStatus;
  isLoading: boolean;
  user: User | undefined;
  favoriteOffers: EntityState<OfferPreview>;
  offers: EntityState<OfferPreview>;
  currentCity: City
}
