import {AuthorizationStatus} from '../const';
import {OfferPreview} from './offers';
import {City} from './city';
import {EntityState} from '@ngrx/entity';
import {User} from './user';


export interface InitialStateApp {
  authorizationStatus: AuthorizationStatus;
  user: User | undefined;
  offers: EntityState<OfferPreview>;
  currentCity: City
}
