import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SORT_TYPE } from '../../../core/constants/const';
import { City } from '../../../core/models/city';

@Directive({
  selector: '[appSetSortPlacesOptions]',
})
export class SetSortPlacesOptionsDirective implements OnChanges {
  @Input({ required: true }) city!: City;
  @Output() public sortTypeSelected: EventEmitter<SORT_TYPE> =
    new EventEmitter<SORT_TYPE>();

  @HostListener('keydown', ['$event'])
  handleSortByTypeKeydown(evt: KeyboardEvent): void {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      this.selectSortTypeFromEvent(evt);
    }
  }

  @HostListener('click', ['$event'])
  handleSortByTypeClick(evt: MouseEvent): void {
    this.selectSortTypeFromEvent(evt);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city']) {
      this.sortTypeSelected.emit(SORT_TYPE.POPULAR);
    }
  }

  selectSortTypeFromEvent(evt: MouseEvent | KeyboardEvent): void {
    const target = evt.target as HTMLElement;
    switch (target.dataset['sortType']) {
      case SORT_TYPE.POPULAR: {
        this.sortTypeSelected.emit(SORT_TYPE.POPULAR);
        break;
      }
      case SORT_TYPE.PRICE_LOW_TO_HIGH: {
        this.sortTypeSelected.emit(SORT_TYPE.PRICE_LOW_TO_HIGH);
        break;
      }
      case SORT_TYPE.PRICE_HIGH_TO_LOW: {
        this.sortTypeSelected.emit(SORT_TYPE.PRICE_HIGH_TO_LOW);
        break;
      }
      case SORT_TYPE.TOP_RATED_FIRST: {
        this.sortTypeSelected.emit(SORT_TYPE.TOP_RATED_FIRST);
        break;
      }
    }
  }
}
