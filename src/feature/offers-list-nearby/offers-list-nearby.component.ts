import {Component, Input, Signal} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CardComponent} from '../../shared/card/card.component';
import {LimitToThreeOffersPipe} from './limit-to-three-offers.pipe';

@Component({
  selector: 'app-offers-list-nearby',
  templateUrl: './offers-list-nearby.component.html',
  imports: [CardComponent, LimitToThreeOffersPipe]
})

export class OffersListNearbyComponent {

  @Input() neighborsOffers!: Signal<OfferPreview[]>
}
