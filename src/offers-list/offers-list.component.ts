import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {OfferPreview} from '../types/offers';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'app-offers-list',
  imports: [CardComponent],
  templateUrl: './offers-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OffersListComponent {
  @Input() offers: OfferPreview[] | null = [];

  @Output() cardActivated = new EventEmitter<OfferPreview | null>();

  onCardActivated(offer: OfferPreview | null) {
    this.cardActivated.emit(offer);
  }
}
