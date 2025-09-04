import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { SORT_TYPE } from '../../../core/constants/const';
import { OfferPreview } from '../../../core/models/offers';

@Directive({
  selector: '[appSetSortPlacesOptions]',
})
export class SetSortPlacesOptionsDirective {
  @Input() public offers!: OfferPreview[];
  @Input() public sortType!: string;
  @Output() public changeSotType = new EventEmitter<SORT_TYPE>();
  @Output() public offersChange = new EventEmitter<OfferPreview[]>();

  onKeydownSortTypeElement(evt: KeyboardEvent): void {
    const target = evt.target as HTMLElement;
    if (evt.key === 'Enter' || evt.key === ' ') {
      switch (target.textContent) {
        case SORT_TYPE.POPULAR: {
          this.sortPopular(evt);
          break;
        }
        case SORT_TYPE.PRICE_LOW_TO_HIGH: {
          this.onClickPriceLowToHigh(evt);
          break;
        }
        case SORT_TYPE.PRICE_HIGH_TO_LOW: {
          this.onClickSortPriceHighToLowBtn(evt);
          break;
        }
        case SORT_TYPE.TOP_RATED_FIRST: {
          this.onClickTopRatedFirst(evt);
          break;
        }
      }
    }
    // if (evt.key === 'Escape') this.toggleSortOptions(false);
  }

  sortPriceLowToHigh(offerFirst: OfferPreview, offerSecond: OfferPreview) {
    return offerFirst.price - offerSecond.price;
  }

  sortPriceHighToLow(offerFirst: OfferPreview, offerSecond: OfferPreview) {
    return offerSecond.price - offerFirst.price;
  }

  sortTopRatedFirst(offerFirst: OfferPreview, offerSecond: OfferPreview) {
    return offerSecond.rating - offerFirst.rating;
  }

  sortPopular(evt: MouseEvent | KeyboardEvent) {
    this.offersChange.emit([...this.offers]);
    // this.changeActiveSortElement(evt);
  }

  onClickSortPriceHighToLowBtn(evt: MouseEvent | KeyboardEvent) {
    this.changeSotType.emit(SORT_TYPE.PRICE_HIGH_TO_LOW);
    this.sortOffers(evt, this.sortPriceHighToLow);
  }

  onClickPriceLowToHigh(evt: MouseEvent | KeyboardEvent) {
    this.changeSotType.emit(SORT_TYPE.PRICE_LOW_TO_HIGH);
    this.sortOffers(evt, this.sortPriceLowToHigh);
  }

  onClickTopRatedFirst(evt: MouseEvent | KeyboardEvent) {
    this.changeSotType.emit(SORT_TYPE.TOP_RATED_FIRST);
    this.sortOffers(evt, this.sortTopRatedFirst);
  }

  onClickPopular(evt: MouseEvent | KeyboardEvent) {
    this.changeSotType.emit(SORT_TYPE.POPULAR);
    this.sortPopular(evt);
  }

  // changeActiveSortElement(evt?: MouseEvent | KeyboardEvent) {
  //   const sortList = this.sortOptionsList.nativeElement;
  //   Array.from<Element>(sortList.children).forEach(item =>
  //     (item as HTMLElement).classList.remove('places__option--active')
  //   );
  //   if (evt) {
  //     const target = evt.target as HTMLElement;
  //     target.classList.add('places__option--active');
  //   } else {
  //     Array.from<Element>(sortList.children)
  //       .find(item => (item as HTMLElement).textContent === 'Popular')
  //       ?.classList?.add('places__option--active');
  //   }
  // }

  sortOffers(
    evt: MouseEvent | KeyboardEvent,
    sortType: (a: OfferPreview, b: OfferPreview) => number
  ) {
    this.offersChange.emit([...this.offers].sort(sortType));
    // this.toggleSortOptions(false);
    // this.changeActiveSortElement(evt);
  }
}
