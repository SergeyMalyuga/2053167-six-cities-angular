import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
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

  @Output() public cardActivated = new EventEmitter<OfferPreview | null>();

  private store = inject(Store<AppState>);
  private destroySubject = new Subject<void>();
  public authorizationStatus = signal<AuthorizationStatus>(
    AuthorizationStatus.NoAuth
  );
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
