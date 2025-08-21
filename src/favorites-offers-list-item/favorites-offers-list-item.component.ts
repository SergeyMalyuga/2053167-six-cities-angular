import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {OfferPreview} from '../types/offers';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'app-favorites-offers-list-item',
  templateUrl: './favorites-offers-list-item.component.html',
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FavoritesOffersListItemComponent {

  @Input() offers: OfferPreview[] | undefined = [];
  @Input() city: string | undefined = undefined;


}
