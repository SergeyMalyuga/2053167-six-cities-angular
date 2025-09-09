import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import * as actions from '../actions/user.actions';

@Injectable()
export class AppLoginEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  userData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loginAction),
      switchMap(({ email, password }) =>
        this.userService.postUser(email, password).pipe(
          map(user => {
            this.authService.setToken(user.token);
            return actions.loginSuccess({ user });
          }),
          catchError(() => of(actions.loginFailure()))
        )
      )
    )
  );
}
