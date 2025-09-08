import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { OfferPreview, SortOffers } from '../../core/models/offers';
import { FavoritesOffersListItemComponent } from '../favorites-offers-list-item/favorites-offers-list-item.component';

@Component({
  selector: 'app-favorites-offers-list',
  templateUrl: './favorites-offers-list.component.html',
  imports: [FavoritesOffersListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesOffersListComponent implements OnChanges {
  @Input({ required: true }) public favoritesOffers!: OfferPreview[];

  public sortFavoritesOffers: SortOffers = new Map();
  public cities: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['favoritesOffers']) {
      this.sortFavoritesOffers.clear();
      this.favoritesOffers.forEach(offer => {
        if (this.sortFavoritesOffers.has(offer.city.name)) {
          this.sortFavoritesOffers.get(offer?.city.name)?.push(offer);
        } else {
          this.sortFavoritesOffers.set(offer.city.name, [offer]);
        }
      });
      this.cities = Array.from(this.sortFavoritesOffers.keys());
    }
  }
}
