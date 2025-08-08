import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {OfferPreview} from '../types/offers';
import {MockOffersService} from '../mock-offers-service';
import {OffersListComponent} from '../offers-list/offers-list.component';
import {MapComponent} from '../map/map.component';
import {AppRoute} from '../app/app.routes';
import {HeaderComponent} from '../header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {selectAllOffers, selectCity} from '../store/app.selectors';
import {City} from '../types/city';
import {combineLatest, map} from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  imports: [OffersListComponent, MapComponent, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainPageComponent implements OnInit {

  constructor(private store: Store<{ appStore: AppState }>) {
  }

  activeCard = signal<OfferPreview | null>(null);
  currentOffers: OfferPreview[] = [];
  currentCity: City | null = null;
  mockOffersService = inject(MockOffersService);
  countOffers = signal(5);

  ngOnInit(): void {
    combineLatest([this.store.select(selectAllOffers), this.store.select(selectCity)])
      .pipe(map(([offers, city]) =>
        offers.filter(offer => offer.city.name === city.name))).subscribe(offers => this.currentOffers = offers);
    this.store.select(selectCity).subscribe(city => this.currentCity = city);
    console.log(this.currentOffers);
  }

  handleCardMouseEnter(offer: OfferPreview | null) {
    if (offer === null) {
      this.activeCard.set(null);
    } else {
      this.activeCard.set(offer);
    }
  }


  protected readonly AppRoute = AppRoute;
}
