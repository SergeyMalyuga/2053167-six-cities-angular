import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal
} from '@angular/core';
import {OfferPreview} from '../types/offers';
import {CardComponent} from '../card/card.component';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {AuthorizationStatus} from '../const';
import {selectAuthorizationStatus} from '../store/app.selectors';
import {Subject, takeUntil} from 'rxjs';

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
