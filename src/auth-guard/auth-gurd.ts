import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {AppRoute} from '../app/app.routes';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  authStatus = false;
  route = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authStatus) {
      return true;
    } else {
      return this.route.createUrlTree([AppRoute.Login], {queryParams: {redirectUrl: state.url}})
    }
  }
}
