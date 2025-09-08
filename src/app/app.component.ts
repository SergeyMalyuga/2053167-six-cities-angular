import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../core/models/app-state';
import { loadOffersData } from '../store/offer/actions/effect.actions';
import { loadFavoriteOffersData } from '../store/favorite-offer/actions/favorite-offer.actions';
import { checkAuthorizationStatus } from '../store/user/actions/user.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private store: Store<AppState> = inject(Store<AppState>);

  ngOnInit(): void {
    this.store.dispatch(loadOffersData());
    this.store.dispatch(loadFavoriteOffersData());
    this.store.dispatch(checkAuthorizationStatus());
  }
}
