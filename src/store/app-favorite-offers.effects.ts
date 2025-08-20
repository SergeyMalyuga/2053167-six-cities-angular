import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FavoriteOffersService} from '../sirvices/favorite-offers.service';
import * as actions from './app.actions';
import {map, of, switchMap} from 'rxjs';
import {catchError} from 'rxjs/operators';

export class AppFavoriteOffersEffects {

  private actions$ = inject(Actions);
  private favoriteOffersService = inject(FavoriteOffersService);

  favoriteOffers$ = createEffect(() => this.actions$.pipe(ofType(actions.loadFavoriteOffersData),
    switchMap(() => this.favoriteOffersService.getFavoriteOffers()
      .pipe(map((offers) => actions.loadFavoriteOffersDataSuccess({favoriteOffers: offers})),
        catchError(() => of(actions.loadFavoriteOffersDataFailure()))))));
}
