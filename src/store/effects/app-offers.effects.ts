import {Actions, createEffect, ofType} from '@ngrx/effects';
import {OffersService} from '../../core/services/offer.service';
import {inject, Injectable} from '@angular/core';
import * as actions from '../actions/app.actions';
import {catchError, switchMap} from 'rxjs/operators';
import {map, of} from 'rxjs';

@Injectable()

export class AppOffersEffects {

  private actions$ = inject(Actions);
  private offersService = inject(OffersService);

  offersData$ = createEffect(() => this.actions$.pipe(ofType(actions.loadOffersData), switchMap(() => this.offersService.getOffers().pipe(
    map(offers => actions.loadOffersDataSuccess({offers})), catchError(() => of(actions.loadOffersDataFailure()))))));
}
