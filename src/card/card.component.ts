import {Component, Input, signal} from '@angular/core';
import {OfferPreview} from '../types/offers';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})

export class CardComponent {
  @Input() offer: OfferPreview| undefined = undefined;
  isActivate = signal(false);
}
