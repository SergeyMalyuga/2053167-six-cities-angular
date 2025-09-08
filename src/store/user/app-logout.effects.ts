import { inject, Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import * as actions from '../app/app.actions';
import { map, of, switchMap } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppLogoutEffects {
  private actions$ = inject(Actions);
  private userServices = inject(UserService);

  logout$ = this.actions$.pipe(
    ofType(actions.logout),
    switchMap(() =>
      this.userServices.deleteUser().pipe(
        map(() => actions.logoutSuccess()),
        catchError(() => of(actions.logoutFailure()))
      )
    )
  );
}
