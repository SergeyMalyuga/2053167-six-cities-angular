import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteOffersService } from '../../../core/services/favorite-offers.service';
import { catchError, switchMap } from 'rxjs/operators';
import { map, of } from 'rxjs';
import * as actions from '../../favorite-offer/actions/favorite-offer.actions';

export class AppChangeOfferStatusEffects {
  private actions$ = inject(Actions);
  private favoriteOffersService = inject(FavoriteOffersService);

  offerStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changeFavoriteStatus),
      switchMap(({ id, status }) =>
        this.favoriteOffersService.changeOfferStatus(id, status).pipe(
          switchMap(offer =>
            this.favoriteOffersService.getFavoriteOffers().pipe(
              map(offers =>
                actions.changeFavoriteStatusSuccess({
                  favoriteOffers: offers,
                  offer,
                })
              ),
              catchError(() => of(actions.changeFavoriteStatusFailure()))
            )
          )
        )
      )
    )
  );
}
