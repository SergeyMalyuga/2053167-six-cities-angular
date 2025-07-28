import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf
  ]
})

export class LoginPageComponent {
  private fb = new FormBuilder();
  loginGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d).+$")]]
  })

  onSubmit() {
    if (this.loginGroup.valid) {
      console.log(this.loginGroup.value);
    }
  }
}
