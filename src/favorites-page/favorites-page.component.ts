import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {MockOffersService} from '../mock-offers-service';
import {OfferPreview} from '../types/offers';
import {FavoritesOffersListComponent} from '../favorites-offers-list/favorites-offers-list.component';
import {HeaderComponent} from '../header/header.component';
import {AuthorizationStatus} from '../const';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  imports: [FavoritesOffersListComponent, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FavoritesPageComponent implements OnInit {

  private mockOffersService = inject(MockOffersService);
  private store = inject(Store<{ appStore: AppState }>);
  private notifier$ = new Subject<void>();
  protected favoritesOffers: OfferPreview[] = [];
  protected authorizationStatus = signal<AuthorizationStatus>(AuthorizationStatus.Unknown);

  ngOnInit(): void {
    this.favoritesOffers = this.mockOffersService.getOffers();
    this.store.select(state => state.appStore.authorizationStatus).pipe(takeUntil(this.notifier$))
      .subscribe(authorizationStatus => this.authorizationStatus.set(authorizationStatus));
  }


}
