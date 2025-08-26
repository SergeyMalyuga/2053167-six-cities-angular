import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {FavoritesOffersListComponent} from '../../feature/favorites-offers-list/favorites-offers-list.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {AuthorizationStatus} from '../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {combineLatest, Subject, takeUntil} from 'rxjs';
import {selectAllFavoriteOffers, selectAuthorizationStatus} from '../../store/app/app.selectors';
import {RouterLink} from '@angular/router';
import {AppRoute} from '../../app/app.routes';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites-page.component.html',
  imports: [FavoritesOffersListComponent, HeaderComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FavoritesPageComponent implements OnInit, OnDestroy {

  private store = inject(Store<{ appStore: AppState }>);
  private notifier$ = new Subject<void>();
  protected favoritesOffers = signal<OfferPreview[]>([]);
  protected authorizationStatus = signal<AuthorizationStatus>(AuthorizationStatus.Unknown);

  ngOnInit(): void {

    combineLatest([this.store.select(selectAuthorizationStatus), this.store.select(selectAllFavoriteOffers)])
      .pipe(takeUntil(this.notifier$))
      .subscribe(([authorizationStatus, favoriteOffers]) => {
        this.favoritesOffers.set([...favoriteOffers]);
        this.authorizationStatus.set(authorizationStatus);
      });
  }

  ngOnDestroy() {
    this.notifier$.next();
    this.notifier$.complete();
  }

  protected readonly AppRoute = AppRoute;
}
