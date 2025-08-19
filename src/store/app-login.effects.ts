import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { UserService } from '../sirvices/user.service';
import * as actions from './app.actions';
import { switchMap, map, catchError, of } from 'rxjs';
import {AuthService} from '../sirvices/auth.service';

export class AppLoginEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  userData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loginAction),
      switchMap(({ email, password }) =>
        this.userService.postUser(email, password).pipe(
          map((user) => {this.authService.setToken(user.token); return actions.loginSuccess({ user })}),
          catchError(() => of(actions.loginFailure()))
        )
      )
    )
  );
}
