import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {OfferPreview} from '../types/offers';
import {MockOffersService} from '../mock-offers-service';
import {OffersListComponent} from '../offers-list/offers-list.component';
import {MapComponent} from '../map/map.component';
import {AppRoute} from '../app/app.routes';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  imports: [OffersListComponent, MapComponent, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainPageComponent implements OnInit {
  activeCard = signal<OfferPreview | null>(null);
  offers: OfferPreview[] = [];
  mockOffersService = inject(MockOffersService);
  countOffers = signal(5);

  ngOnInit(): void {
    this.offers = this.mockOffersService.getOffers();
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
