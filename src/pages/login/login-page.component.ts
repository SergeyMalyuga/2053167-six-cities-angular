import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AppRoute } from '../../app/app.routes';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import {
  AuthorizationStatus,
  CITY_LOCATIONS,
} from '../../core/constants/const';
import { RandomCityPipe } from './random-city.pipe';
import { selectAuthorizationStatus } from '../../store/app/app.selectors';
import { filter, take } from 'rxjs';
import { loadOffersData } from '../../store/offer/actions/effect.actions';
import { loadFavoriteOffersData } from '../../store/favorite-offer/actions/favorite-offer.actions';
import { loginAction } from '../../store/user/actions/user.actions';
import { changeCity } from '../../store/city/actions/city.actions';
import { City } from '../../core/models/city';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [ReactiveFormsModule, NgIf, RouterLink, RandomCityPipe],
})
export class LoginPageComponent {
  private fb: FormBuilder = new FormBuilder();
  loginGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).+$')],
    ],
  });

  private store: Store<AppState> = inject(Store<{ appStore: AppState }>);
  private router = inject(Router);

  public readonly AppRoute: typeof AppRoute = AppRoute;
  public readonly CITY_LOCATIONS: City[] = CITY_LOCATIONS;

  public onSubmit(): void {
    if (this.loginGroup.valid) {
      const { email, password } = this.loginGroup.getRawValue();
      if (email && password) {
        this.store.dispatch(loginAction({ email, password }));
      }
      this.store
        .select(selectAuthorizationStatus)
        .pipe(
          filter(
            (auth: AuthorizationStatus) => auth === AuthorizationStatus.Auth
          ),
          take(1)
        )
        .subscribe((): void => {
          this.store.dispatch(loadOffersData());
          this.store.dispatch(loadFavoriteOffersData());
          this.router.navigate([AppRoute.Main]);
        });
    }
  }

  public navigateToCityOffers(event: MouseEvent): void {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const currentCity = CITY_LOCATIONS.find(
      city => city.name === target.textContent
    );
    if (currentCity) {
      this.store.dispatch(changeCity({ city: currentCity }));
    }
    this.router.navigate([AppRoute.Main]);
  }
}
