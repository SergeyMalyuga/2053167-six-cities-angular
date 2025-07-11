import {Routes} from '@angular/router';
import {FavoritesComponent} from '../favorites-page/favorites.component';
import {AuthGuard} from '../auth-guard/auth-gurd';
import {LoginComponent} from '../login-page/login.component';
import {MainComponent} from '../main-page/main.component';
import {NotFoundComponent} from '../not-found-page/not-found.component';
import {OfferPageComponent} from '../offer-page/offer-page.component';

export enum AppRoute {
  Main = '',
  Login = 'login',
  Favorites = 'favorites',
  Offer = 'offer',
}

export const routes: Routes = [
  {path: AppRoute.Main , component: MainComponent},
  {path: AppRoute.Favorites, component: FavoritesComponent, canActivate: [AuthGuard]},
  {path: AppRoute.Login , component: LoginComponent},
  {path: `${AppRoute.Offer}/:id` , component: OfferPageComponent},
  {path: '**', component: NotFoundComponent},
];
