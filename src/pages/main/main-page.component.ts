import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { OffersListComponent } from '../../feature/offers-list/offers-list.component';
import { MapComponent } from '../../shared/map/map.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { selectAllOffers, selectCity } from '../../store/app/app.selectors';
import { combineLatest, map, Subject, takeUntil, tap } from 'rxjs';
import { CitiesListComponent } from '../../feature/cities-list/cities-list';
import {
  AuthorizationStatus,
  DEFAULT_CITY,
  SORT_TYPE,
} from '../../core/constants/const';
import { PlacesSortingFormComponent } from '../../feature/places-sorting-form/places-sorting-form.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { SortOffersService } from '../../core/services/sort-offers.service';
import { City } from '../../core/models/city';

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
  protected activeCard: WritableSignal<OfferPreview | null> =
    signal<OfferPreview | null>(null);
  protected currentOffers: OfferPreview[] = [];
  protected basicOffers: OfferPreview[] = [];
  protected currentCity: City = DEFAULT_CITY;
  protected isLoading: WritableSignal<boolean> = signal<boolean>(false);
  protected currentSortType: WritableSignal<string> = signal<string>(
    SORT_TYPE.POPULAR
  );
  protected authorizationStatus: WritableSignal<AuthorizationStatus> =
    signal<AuthorizationStatus>(AuthorizationStatus.Unknown);

  private destroySubject: Subject<void> = new Subject<void>();
  private sortService: SortOffersService = inject(SortOffersService);
  private store: Store<AppState> = inject(Store<AppState>);

  public ngOnInit(): void {
    combineLatest([
      this.store.select(selectAllOffers),
      this.store.select(selectCity),
    ])
      .pipe(
        tap(
          ([, city]: [OfferPreview[], City]) => (this.currentCity = { ...city })
        ),
        map(([offers, city]: [OfferPreview[], City]): OfferPreview[] =>
          offers.filter(
            (offer: OfferPreview): boolean => offer.city.name === city.name
          )
        ),
        takeUntil(this.destroySubject)
      )
      .subscribe((offers: OfferPreview[]): void => {
        this.currentOffers = [...offers];
        this.basicOffers = [...offers];
      });

    this.store
      .select((state: AppState): AppState => state)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((state: AppState): void => {
        this.isLoading.set(state.offers.isLoading);
        this.authorizationStatus.set(state.user.authorizationStatus);
      });
  }

  public ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  public handleCardMouseEnter(offer: OfferPreview | null): void {
    if (offer === null) {
      this.activeCard.set(null);
    } else {
      this.activeCard.set(offer);
    }
  }

  public handleSortTypeChanged(sortType: SORT_TYPE): void {
    this.currentSortType.set(sortType);
    this.currentOffers = this.sortService.sortOffersByType(
      this.basicOffers,
      sortType
    );
  }

  public onCurrentSortTypeChanged(sortType: SORT_TYPE): void {
    this.currentSortType.set(sortType);
  }
}
