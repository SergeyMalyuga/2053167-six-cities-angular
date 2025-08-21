import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {OfferPreview, SortOffers} from '../types/offers';
import {FavoritesOffersListItemComponent} from '../favorites-offers-list-item/favorites-offers-list-item.component';

@Component({
  selector: 'app-favorites-offers-list',
  templateUrl: './favorites-offers-list.component.html',
  imports: [FavoritesOffersListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FavoritesOffersListComponent implements OnChanges {

  @Input() favoritesOffers!: OfferPreview[];

  sortFavoritesOffers: SortOffers = new Map();
  cities: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['favoritesOffers']) {
        this.sortFavoritesOffers.clear();
        this.favoritesOffers.forEach(offer => {
          if(this.sortFavoritesOffers.has(offer.city.name)) {
            this.sortFavoritesOffers.get(offer?.city.name)?.push(offer);
          } else {
            this.sortFavoritesOffers.set(offer.city.name, [offer]);
          }
        })
        this.cities = Array.from(this.sortFavoritesOffers.keys())
      }
  }
}
