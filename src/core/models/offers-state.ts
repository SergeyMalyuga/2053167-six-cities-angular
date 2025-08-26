import {OfferPreview} from './offers';
import {EntityState} from '@ngrx/entity';

export interface OffersState extends EntityState<OfferPreview>{
  isLoading: boolean;
  error: string | null;
}
