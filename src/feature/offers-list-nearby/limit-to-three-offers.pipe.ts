import { Pipe, PipeTransform } from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { MAX_OFFERS_LENGTH } from '../../core/constants/const';

@Pipe({
  name: 'limitToThreeOffers',
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
