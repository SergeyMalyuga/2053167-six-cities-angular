import { Injectable } from '@angular/core';
import { OfferPreview } from '../models/offers';
import { SORT_TYPE } from '../constants/const';

@Injectable()
export class SortOffersService {
  private sortPriceLowToHigh(
    offerFirst: OfferPreview,
    offerSecond: OfferPreview
  ) {
    return offerFirst.price - offerSecond.price;
  }

  private sortPriceHighToLow(
    offerFirst: OfferPreview,
    offerSecond: OfferPreview
  ) {
    return offerSecond.price - offerFirst.price;
  }

  private sortTopRatedFirst(
    offerFirst: OfferPreview,
    offerSecond: OfferPreview
  ) {
    return offerSecond.rating - offerFirst.rating;
  }

  private sortOffers(
    offers: OfferPreview[],
    sortType: (a: OfferPreview, b: OfferPreview) => number
  ) {
    return [...offers].sort(sortType);
  }

  public sortOffersByType(
    offers: OfferPreview[],
    sortType: SORT_TYPE
  ): OfferPreview[] {
    switch (sortType) {
      case SORT_TYPE.POPULAR: {
        return offers;
      }
      case SORT_TYPE.PRICE_LOW_TO_HIGH: {
        return this.sortOffers(offers, this.sortPriceLowToHigh);
      }
      case SORT_TYPE.PRICE_HIGH_TO_LOW: {
        return this.sortOffers(offers, this.sortPriceHighToLow);
      }
      case SORT_TYPE.TOP_RATED_FIRST: {
        return this.sortOffers(offers, this.sortTopRatedFirst);
      }
    }
  }
}
