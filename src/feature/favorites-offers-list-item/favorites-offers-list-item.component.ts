import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-favorites-offers-list-item',
  templateUrl: './favorites-offers-list-item.component.html',
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesOffersListItemComponent {
  @Input({ required: true }) public offers: OfferPreview[] | undefined = [];
  @Input({ required: true }) public city: string | undefined = undefined;
}
