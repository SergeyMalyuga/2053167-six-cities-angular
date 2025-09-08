import { Token } from '../models/token';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_TOKEN_KEY_NAME = 'auth-token';

  public getToken(): Token | null {
    const token = localStorage.getItem(this.AUTH_TOKEN_KEY_NAME);
    return token ?? null;
  }

  public setToken(token: Token): void {
    localStorage.setItem(this.AUTH_TOKEN_KEY_NAME, token);
  }

  public removeToken(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY_NAME);
  }
}
