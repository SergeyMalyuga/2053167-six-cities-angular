import {Routes} from '@angular/router';
import {FavoritesPageComponent} from '../favorites-page/favorites-page.component';
import {AuthGuard} from '../auth-guard/auth-gurd';
import {LoginPageComponent} from '../login-page/login-page.component';
import {MainPageComponent} from '../main-page/main-page.component';
import {NotFoundPageComponent} from '../not-found-page/not-found-page.component';
import {OfferPageComponent} from '../offer-page/offer-page.component';

export enum AppRoute {
  Main = '',
  Login = 'login',
  Favorites = 'favorites',
  Offer = 'offer',
}

export const routes: Routes = [
  {path: AppRoute.Main , component: MainPageComponent},
  {path: AppRoute.Favorites, component: FavoritesPageComponent, canActivate: [AuthGuard]},
  {path: AppRoute.Login , component: LoginPageComponent},
  {path: `${AppRoute.Offer}/:id` , component: OfferPageComponent},
  {path: '**', component: NotFoundPageComponent},
];
