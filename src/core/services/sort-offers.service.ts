import {Injectable} from '@angular/core';
import {OfferPreview} from '../models/offers';
import {SORT_TYPE} from '../constants/const';

@Injectable()
export class SortOffersService {
  sortPriceLowToHigh(offerFirst: OfferPreview, offerSecond: OfferPreview) {
    return offerFirst.price - offerSecond.price;
  }

  sortPriceHighToLow(offerFirst: OfferPreview, offerSecond: OfferPreview) {
    return offerSecond.price - offerFirst.price;
  }

  sortTopRatedFirst(offerFirst: OfferPreview, offerSecond: OfferPreview) {
    return offerSecond.rating - offerFirst.rating;
  }

  applySortPriceHighToLowSort() {
    this.sortTypeSelected.emit(SORT_TYPE.PRICE_HIGH_TO_LOW);
    this.sortOffers(this.sortPriceHighToLow);
  }

  applyPriceLowToHighSort() {
    this.sortTypeSelected.emit(SORT_TYPE.PRICE_LOW_TO_HIGH);
    this.sortOffers(this.sortPriceLowToHigh);
  }

  applyTopRatedFirstSort() {
    this.sortTypeSelected.emit(SORT_TYPE.TOP_RATED_FIRST);
    this.sortOffers(this.sortTopRatedFirst);
  }

  applyPopularSort() {
    this.sortTypeSelected.emit(SORT_TYPE.POPULAR);
    this.offersSorted.emit([...this.offers]);
  }

  sortOffers(sortType: (a: OfferPreview, b: OfferPreview) => number
  ) {
    this.offersSorted.emit([...this.offers].sort(sortType));
  }

  sortOffersByType(evt: MouseEvent | KeyboardEvent) {
    const target = evt.target as HTMLElement;
    switch (target.dataset['sortType']) {
      case SORT_TYPE.POPULAR: {
        this.applyPopularSort();
        break;
      }
      case SORT_TYPE.PRICE_LOW_TO_HIGH: {
        this.applyPriceLowToHighSort();
        break;
      }
      case SORT_TYPE.PRICE_HIGH_TO_LOW: {
        this.applySortPriceHighToLowSort();
        break;
      }
      case SORT_TYPE.TOP_RATED_FIRST: {
        this.applyTopRatedFirstSort();
        break;
      }
    }
  }
}
