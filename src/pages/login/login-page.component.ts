import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AppRoute } from '../../app/app.routes';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import {
  changeCity,
  loadFavoriteOffersData,
  loadOffersData,
  loginAction,
} from '../../store/app/app.actions';
import {
  AuthorizationStatus,
  CITY_LOCATIONS,
} from '../../core/constants/const';
import { RandomCityPipe } from './random-city.pipe';
import { selectAuthorizationStatus } from '../../store/app/app.selectors';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [ReactiveFormsModule, NgIf, RouterLink, RandomCityPipe],
})
export class LoginPageComponent {
  private fb = new FormBuilder();
  loginGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).+$')],
    ],
  });

  private store = inject(Store<{ appStore: AppState }>);
  private router = inject(Router);

  onSubmit() {
    if (this.loginGroup.valid) {
      const { email, password } = this.loginGroup.getRawValue();
      if (email && password) {
        this.store.dispatch(loginAction({ email, password }));
      }
      this.store
        .select(selectAuthorizationStatus)
        .pipe(
          filter(auth => auth === AuthorizationStatus.Auth),
          take(1)
        )
        .subscribe(() => {
          this.store.dispatch(loadOffersData());
          this.store.dispatch(loadFavoriteOffersData());
          this.router.navigate([AppRoute.Main]);
        });
    }
  }

  navigateToCityOffers(event: MouseEvent) {
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

  protected readonly AppRoute = AppRoute;
  protected readonly CITY_LOCATIONS = CITY_LOCATIONS;
}
