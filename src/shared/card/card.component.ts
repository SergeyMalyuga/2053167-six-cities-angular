import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { CapitalizePipe } from './capitalize.pipe';
import { Router, RouterModule } from '@angular/router';
import { AppRoute } from '../../app/app.routes';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { AuthorizationStatus } from '../../core/constants/const';
import {
  selectAuthorizationStatus,
  selectFavoriteOffersIsLoading,
} from '../../store/app/app.selectors';
import { filter, finalize, Subject, take, takeUntil } from 'rxjs';
import { ToggleOfferFavoriteDirective } from '../../pages/offer/directives/toggle-offer-favorite.directive';
import { changeFavoriteStatus } from '../../store/favorite-offer/actions/favorite-offer.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [CapitalizePipe, RouterModule, ToggleOfferFavoriteDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) public offer: OfferPreview | undefined = undefined;
  @Input({ required: true }) public isFavoritePage = false;
  @Input({ required: true }) public isOfferPage = false;

  @Output() public cardMouseEnter: EventEmitter<OfferPreview> =
    new EventEmitter<OfferPreview>();
  @Output() public cardMouseLeave: EventEmitter<void> =
    new EventEmitter<void>();

  private store: Store<AppState> = inject(Store<AppState>);
  private destroySubject: Subject<void> = new Subject<void>();
  private router: Router = inject(Router);
  private isFavorite = false;
  public readonly AuthorizationStatus: typeof AuthorizationStatus =
    AuthorizationStatus;
  public isFavoriteButtonDisabled: WritableSignal<boolean> =
    signal<boolean>(false);
  public authorizationStatus: WritableSignal<AuthorizationStatus> =
    signal<AuthorizationStatus>(AuthorizationStatus.NoAuth);
  public readonly Math: Math = Math;
  public readonly AppRoute: typeof AppRoute = AppRoute;

  public ngOnInit(): void {
    this.isFavorite = this.offer ? this.offer.isFavorite : false;
    this.store
      .select(selectAuthorizationStatus)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((auth: AuthorizationStatus): void =>
        this.authorizationStatus.set(auth)
      );
  }

  public ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  public onMouseEnter(): void {
    this.cardMouseEnter.emit(this.offer);
  }

  public onMouseLeave(): void {
    this.cardMouseLeave.emit();
  }

  public handleOfferFavoriteToggled(): void {
    if (this.authorizationStatus() === AuthorizationStatus.Auth) {
      this.isFavoriteButtonDisabled.set(true);
      this.store.dispatch(
        changeFavoriteStatus({
          id: this.offer?.id,
          status: +!this.isFavorite,
        })
      );
      this.store
        .select(selectFavoriteOffersIsLoading)
        .pipe(
          filter((isLoading: boolean): boolean => isLoading === false),
          take(1),
          finalize((): void => {
            this.isFavoriteButtonDisabled.set(false);
          })
        )
        .subscribe();
      this.isFavorite = !this.isFavorite;
    } else {
      this.router.navigate([AppRoute.Login]);
    }
  }
}
