import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-offers-list',
  imports: [CardComponent],
  templateUrl: './offers-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersListComponent {
  @Input({ required: true }) public offers: OfferPreview[] | null = [];

  @Output() public cardActivated = new EventEmitter<OfferPreview | null>();

  public onCardActivated(offer: OfferPreview | null): void {
    this.cardActivated.emit(offer);
  }
}
