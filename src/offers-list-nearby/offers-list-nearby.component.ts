import {Component} from '@angular/core';
import {OfferPreview} from '../types/offers';
import {neighborOffers} from '../mocks/neghbor-offers';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'app-offers-list-nearby',
  templateUrl: './offers-list-nearby.component.html',
  imports: [CardComponent]
})

export class OffersListNearbyComponent {
  neighborsOffers: OfferPreview[] = neighborOffers;
}
