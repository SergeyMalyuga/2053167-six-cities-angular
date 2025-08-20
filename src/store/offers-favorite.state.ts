import {EntityState} from '@ngrx/entity';
import {Offer} from '../types/offers';

export interface FavoriteOffersState extends EntityState<Offer> {
  isLoading: boolean;
  error: string;
}
