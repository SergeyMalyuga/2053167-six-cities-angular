import {HttpClient} from '@angular/common/http';
import {User} from '../types/user';
import {APIRoute, BASE_URL} from '../const';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {
  }

  postUser(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/${APIRoute.Login}`, {email, password});
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/${APIRoute.Login}`);
  }

  deleteUser(): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${APIRoute.Login}`);
  }
}
