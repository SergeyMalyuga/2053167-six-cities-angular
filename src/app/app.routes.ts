import {Routes} from '@angular/router';
import {FavoritesPageComponent} from '../pages/favorites/favorites-page.component';
import {AuthGuard} from '../core/guards/auth-guard/auth-gurd';
import {MainPageComponent} from '../pages/main/main-page.component';
import {NotFoundPageComponent} from '../pages/not-found/not-found-page.component';
import {OfferPageComponent} from '../pages/offer/offer-page.component';

export enum AppRoute {
  Main = '',
  Login = 'login',
  Favorites = 'favorites',
  Offer = 'offer',
}

export const routes: Routes = [
  {path: AppRoute.Main, component: MainPageComponent},
  {path: AppRoute.Favorites, component: FavoritesPageComponent, canActivate: [AuthGuard]},
  {
    path: AppRoute.Login,
    loadComponent: () => import('../pages/login/login-page.component').then(m => m.LoginPageComponent)
  },
  {path: `${AppRoute.Offer}/:id`, component: OfferPageComponent},
  {path: '**', component: NotFoundPageComponent},
];
