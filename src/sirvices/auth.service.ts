import {Token} from '../types/token';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  AUTH_TOKEN_KEY_NAME = 'auth-token';

  getToken = (): Token => {
    const token = localStorage.getItem(this.AUTH_TOKEN_KEY_NAME);
    return token ?? '';
  };

  setToken = (token: Token): void =>
    localStorage.setItem(this.AUTH_TOKEN_KEY_NAME, token);

  removeToken = (): void =>
    localStorage.removeItem(this.AUTH_TOKEN_KEY_NAME);
}

