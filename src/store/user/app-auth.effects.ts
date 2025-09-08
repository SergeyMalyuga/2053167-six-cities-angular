import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../app/app.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';
import { of } from 'rxjs';

@Injectable()
export class AppAuthEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  authorization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.checkAuthorizationStatus),
      switchMap(() =>
        this.userService.getUser().pipe(
          map(user => actions.checkAuthorizationStatusSuccess({ user })),
          catchError(() => of(actions.checkAuthorizationStatusFailure()))
        )
      )
    )
  );
}
