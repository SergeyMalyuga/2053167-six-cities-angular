import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal} from '@angular/core';
import {OfferPreview} from '../types/offers';
import {OffersListComponent} from '../offers-list/offers-list.component';
import {MapComponent} from '../map/map.component';
import {HeaderComponent} from '../header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {selectAllOffers, selectCity} from '../store/app.selectors';
import {combineLatest, map, Subject, takeUntil, tap} from 'rxjs';
import {CitiesListComponent} from '../cities-list/cities-list';
import {DEFAULT_CITY} from '../const';
import {PlacesSortingFormComponent} from '../places-sorting-form/places-sorting-form.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  imports: [OffersListComponent, MapComponent, HeaderComponent, CitiesListComponent, PlacesSortingFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainPageComponent implements OnInit, OnDestroy {

  constructor(private store: Store<{ appStore: AppState }>) {
  }

  activeCard = signal<OfferPreview | null>(null);
  protected currentOffers: OfferPreview[] = [];
  protected basicOffers: OfferPreview[] = [];
  protected currentCity = DEFAULT_CITY;

  private notifier$ = new Subject<void>();

  ngOnInit(): void {
    combineLatest([this.store.select(selectAllOffers), this.store.select(selectCity)])
      .pipe(tap(([, city]) => this.currentCity = city), map(([offers, city]) =>
          offers.filter(offer => offer.city.name === city.name)),
        takeUntil(this.notifier$))
      .subscribe(offers => {this.currentOffers = offers; this.basicOffers = [...offers]});
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  handleCardMouseEnter(offer: OfferPreview | null) {
    if (offer === null) {
      this.activeCard.set(null);
    } else {
      this.activeCard.set(offer);
    }
  }

  changeOffers(offers: OfferPreview[]) {
    this.currentOffers = offers;
  }
}
