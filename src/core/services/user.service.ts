import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { APIRoute, BASE_URL } from '../constants/const';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  public postUser(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/${APIRoute.Login}`, {
      email,
      password,
    });
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/${APIRoute.Login}`);
  }

  public deleteUser(): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${APIRoute.Login}`);
  }
}
