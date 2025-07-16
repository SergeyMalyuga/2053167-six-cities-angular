import {Component, Input} from '@angular/core';
import {OfferPreview} from '../types/offers';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'app-offers-list',
  imports: [CardComponent],
  templateUrl: './offers-list.component.html',
})

export class OffersListComponent {
  @Input() offers: OfferPreview[] = [];
}
