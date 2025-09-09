import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { FavoritesOffersListComponent } from '../../feature/favorites-offers-list/favorites-offers-list.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { AuthorizationStatus } from '../../core/constants/const';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import {
  selectAllFavoriteOffers,
  selectAuthorizationStatus,
} from '../../store/app/app.selectors';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../../app/app.routes';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites-page.component.html',
  imports: [FavoritesOffersListComponent, HeaderComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPageComponent implements OnInit, OnDestroy {
  private store: Store<AppState> = inject(Store<AppState>);
  private destroySubject: Subject<void> = new Subject<void>();
  public favoritesOffers: WritableSignal<OfferPreview[]> = signal<
    OfferPreview[]
  >([]);
  public authorizationStatus: WritableSignal<AuthorizationStatus> =
    signal<AuthorizationStatus>(AuthorizationStatus.Unknown);
  public readonly AppRoute: typeof AppRoute = AppRoute;

  public ngOnInit(): void {
    combineLatest([
      this.store.select(selectAuthorizationStatus),
      this.store.select(selectAllFavoriteOffers),
    ])
      .pipe(takeUntil(this.destroySubject))
      .subscribe(
        ([authorizationStatus, favoriteOffers]: [
          AuthorizationStatus,
          OfferPreview[],
        ]): void => {
          this.favoritesOffers.set([...favoriteOffers]);
          this.authorizationStatus.set(authorizationStatus);
        }
      );
  }

  public ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
