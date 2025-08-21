import {EntityState} from '@ngrx/entity';
import {OfferPreview} from '../types/offers';

export interface FavoriteOffersState extends EntityState<OfferPreview> {
  isLoading: boolean;
  error: string;
}
