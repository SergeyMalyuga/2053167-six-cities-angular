import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  public intercept(
    req: HttpRequest<Request>,
    next: HttpHandler
  ): Observable<HttpEvent<Request>> {
    const token = this.authService.getToken();
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('x-token', token),
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
