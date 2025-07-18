import {MockFavoriteOffers} from '../mocks/mock-favorite-offers';
import {Component, OnInit} from '@angular/core';
import {SortOffers} from '../types/offers';
import {FavoritesOffersListItemComponent} from '../favorites-offers-list-item/favorites-offers-list-item.component';

@Component({
  selector: 'app-favorites-offers-list',
  templateUrl: './favorites-offers-list.component.html',
  imports: [FavoritesOffersListItemComponent]
})

export class FavoritesOffersListComponent implements OnInit {

  favoritesOffers = MockFavoriteOffers
  sortFavoritesOffers: SortOffers = new Map();
  cities: string[] = [];

  ngOnInit(): void {
    this.favoritesOffers.forEach(offer => {
      if(offer.city.name in this.sortFavoritesOffers) {
        this.sortFavoritesOffers.get(offer?.city.name)?.push(offer);
      }
      this.sortFavoritesOffers.set(offer.city.name, [offer]);
    })

    this.cities = Array.from(this.sortFavoritesOffers.keys())
  }
}
