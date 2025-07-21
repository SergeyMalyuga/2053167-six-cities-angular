import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MockOffersService} from '../mock-offers-service';
import {OfferPreview} from '../types/offers';
import {FavoritesOffersListComponent} from '../favorites-offers-list/favorites-offers-list.component';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  imports: [FavoritesOffersListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FavoritesPageComponent implements OnInit {

  mockOffersService = inject(MockOffersService);
  favoritesOffers: OfferPreview[] = [];

  ngOnInit(): void {
    this.favoritesOffers = this.mockOffersService.getOffers();
  }


}
