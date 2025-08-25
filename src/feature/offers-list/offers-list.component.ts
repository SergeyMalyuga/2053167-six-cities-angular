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
import {OfferPreview} from '../../core/models/offers';
import {CardComponent} from '../../shared/card/card.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {AuthorizationStatus} from '../../core/constants/const';
import {selectAuthorizationStatus} from '../../store/selectors/app.selectors';
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
