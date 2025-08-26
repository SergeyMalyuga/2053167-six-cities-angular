import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject, Injectable, signal} from '@angular/core';
import {AppRoute} from '../../../app/app.routes';
import {Store} from '@ngrx/store';
import {AppState} from '../../models/app.state';
import {AuthorizationStatus} from '../../constants/const';
import {filter, map, Observable, take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  private route = inject(Router);


  constructor(private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.select(state => state.user.authorizationStatus).pipe(
      filter(status => status !== AuthorizationStatus.Unknown),
      take(1),
      map(status => {
        if (status === AuthorizationStatus.Auth) {
          return true;
        } else {
          return this.route.createUrlTree([AppRoute.Login], {
            queryParams: { redirectUrl: state.url }
          });
        }
      })
    );
  }
}
