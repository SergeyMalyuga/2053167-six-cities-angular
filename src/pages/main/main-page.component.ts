import {
  ChangeDetectionStrategy,
  Component, inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {OffersListComponent} from '../../feature/offers-list/offers-list.component';
import {MapComponent} from '../../shared/map/map.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app-state';
import {selectAllOffers, selectCity} from '../../store/app/app.selectors';
import {combineLatest, map, Subject, takeUntil, tap} from 'rxjs';
import {CitiesListComponent} from '../../feature/cities-list/cities-list';
import {
  AuthorizationStatus,
  DEFAULT_CITY,
  SORT_TYPE,
} from '../../core/constants/const';
import {PlacesSortingFormComponent} from '../../feature/places-sorting-form/places-sorting-form.component';
import {LoaderComponent} from '../../shared/loader/loader.component';
import {SortOffersService} from '../../core/services/sort-offers.service';

@Component({
  selector: 'app-main',
  templateUrl: './main-page.component.html',
  imports: [
    OffersListComponent,
    MapComponent,
    HeaderComponent,
    CitiesListComponent,
    PlacesSortingFormComponent,
    LoaderComponent,
  ],
  providers: [SortOffersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {
  }

  protected activeCard = signal<OfferPreview | null>(null);
  protected currentOffers: OfferPreview[] = [];
  protected basicOffers: OfferPreview[] = [];
  protected currentCity = DEFAULT_CITY;
  protected isLoading = signal<boolean>(false);
  protected currentSortType = signal<string>(SORT_TYPE.POPULAR);
  protected authorizationStatus = signal<AuthorizationStatus>(
    AuthorizationStatus.Unknown
  );

  private destroy$ = new Subject<void>();
  private sortService = inject(SortOffersService);

  ngOnInit(): void {
    combineLatest([
      this.store.select(selectAllOffers),
      this.store.select(selectCity),
    ])
      .pipe(
        tap(([, city]) => (this.currentCity = {...city})),
        map(([offers, city]) =>
          offers.filter(offer => offer.city.name === city.name)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(offers => {
        this.currentOffers = [...offers];
        this.basicOffers = [...offers];
      });

    this.store
      .select(state => state)
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.isLoading.set(state.offers.isLoading);
        this.authorizationStatus.set(state.user.authorizationStatus);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleCardMouseEnter(offer: OfferPreview | null) {
    if (offer === null) {
      this.activeCard.set(null);
    } else {
      this.activeCard.set(offer);
    }
  }

  handleSortTypeChanged(sortType: SORT_TYPE): void {
    this.currentSortType.set(sortType);
    this.currentOffers = this.sortService.sortOffersByType(this.basicOffers, sortType);
  }

  onCurrentSortTypeChanged(sortType: SORT_TYPE) { //TODO проверить нужен ли метод
    this.currentSortType.set(sortType);
  }
}
