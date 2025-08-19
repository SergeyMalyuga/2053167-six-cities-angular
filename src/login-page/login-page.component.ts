import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AppRoute} from '../app/app.routes';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {loginAction} from '../store/app.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ]
})

export class LoginPageComponent {
  private fb = new FormBuilder();
  loginGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d).+$")]]
  })

  private store = inject(Store<{ appStore: AppState }>);
  private route = inject(Router);

  onSubmit() {
    if (this.loginGroup.valid) {
      const {email, password} = this.loginGroup.getRawValue();
      if (email && password) {
        this.store.dispatch(loginAction({email, password}));
      }
      this.route.navigate([AppRoute.Main]);
    }
  }

  protected readonly AppRoute = AppRoute;
}
