import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { selectCity } from '../../store/app/app.selectors';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { SORT_TYPE } from '../../core/constants/const';
import { ToggleSortOptionsDirective } from './directives/toggle-sort-options.directive';
import { CloseSortOptionsDirective } from './directives/close-sort-options.directive';

@Component({
  selector: 'app-places-sorting-form',
  templateUrl: './places-sorting-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ToggleSortOptionsDirective, CloseSortOptionsDirective],
})
export class PlacesSortingFormComponent implements OnDestroy {
  @Input() public offers!: OfferPreview[];
  @Input() public sortType!: string;
  @Output() public offersChange = new EventEmitter<OfferPreview[]>();
  @Output() public changeSotType = new EventEmitter<SORT_TYPE>();
  @ViewChild('sortOptionsList') sortOptionsList!: ElementRef;

  private destroy$ = new Subject<void>();
  private store = inject(Store<AppState>);
  public isSortOptionsOpen = signal<boolean>(false);

  // ngAfterViewInit(): void {
  //   this.store
  //     .select(selectCity)
  //     .pipe(distinctUntilChanged((prev, curr) => prev.name === curr.name))
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(() => this.changeActiveSortElement());
  // }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setSortOptionsOpen(isOpen: boolean): void {
    this.isSortOptionsOpen.set(isOpen);
  }

  /*public toggleSortOptions(force?: boolean) {
    this.sortOptionsList.nativeElement.classList.toggle(
      'places__options--opened',
      force
    );
  }

  onClickPlacesSorting() {
    this.toggleSortOptions();
  }

  onSortOptionsListMouseLeave() {
    this.toggleSortOptions(false);
  }

  onKeydown(event: KeyboardEvent): void {
    //TODO change method
    if (event.key === 'Enter' || event.key === ' ') this.toggleSortOptions();
    if (event.key === 'Escape') this.toggleSortOptions(false);
  }

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
    if (evt.key === 'Escape') this.toggleSortOptions(false);
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
    this.changeActiveSortElement(evt);
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

  changeActiveSortElement(evt?: MouseEvent | KeyboardEvent) {
    const sortList = this.sortOptionsList.nativeElement;
    Array.from<Element>(sortList.children).forEach(item =>
      (item as HTMLElement).classList.remove('places__option--active')
    );
    if (evt) {
      const target = evt.target as HTMLElement;
      target.classList.add('places__option--active');
    } else {
      Array.from<Element>(sortList.children)
        .find(item => (item as HTMLElement).textContent === 'Popular')
        ?.classList?.add('places__option--active');
    }
  }

  sortOffers(
    evt: MouseEvent | KeyboardEvent,
    sortType: (a: OfferPreview, b: OfferPreview) => number
  ) {
    this.offersChange.emit([...this.offers].sort(sortType));
    this.toggleSortOptions(false);
    this.changeActiveSortElement(evt);
  }*/
}
