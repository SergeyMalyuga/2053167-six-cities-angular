import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { CardComponent } from '../../shared/card/card.component';
import { ToggleOfferFavoriteDirective } from '../../pages/offer/directives/toggle-offer-favorite.directive';
import { selectAuthorizationStatus } from '../../store/app/app.selectors';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { AuthorizationStatus } from '../../core/constants/const';

@Component({
  selector: 'app-offers-list',
  imports: [CardComponent, ToggleOfferFavoriteDirective],
  templateUrl: './offers-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersListComponent implements OnInit {
  @Input({ required: true }) public offers: OfferPreview[] | null = [];

  @Output() public cardActivated: EventEmitter<OfferPreview | null> =
    new EventEmitter<OfferPreview | null>();

  private store: Store<AppState> = inject(Store<AppState>);
  private destroySubject: Subject<void> = new Subject<void>();
  public authorizationStatus: WritableSignal<AuthorizationStatus> =
    signal<AuthorizationStatus>(AuthorizationStatus.NoAuth);
  public onCardActivated(offer: OfferPreview | null): void {
    this.cardActivated.emit(offer);
  }

  ngOnInit(): void {
    this.store
      .select(selectAuthorizationStatus)
      .pipe(takeUntil(this.destroySubject))
      .subscribe(auth => this.authorizationStatus.set(auth));
  }
}
