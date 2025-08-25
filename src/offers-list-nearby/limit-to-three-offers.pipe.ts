import {Pipe, PipeTransform} from '@angular/core';
import {OfferPreview} from '../types/offers';
import {MAX_OFFERS_LENGTH} from '../const';

@Pipe({
  name: 'limitToThreeOffers'
})

export class LimitToThreeOffersPipe implements PipeTransform {
  transform(value: OfferPreview[]): OfferPreview[] {
    if (value) {
      return value.slice(0, MAX_OFFERS_LENGTH);
    } else {
      return [];
    }
  }
}
