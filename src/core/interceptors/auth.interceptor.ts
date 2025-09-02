import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  public intercept(req: HttpRequest<Request>, next: HttpHandler) {
    const token = this.authService.getToken();
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('x-token', token)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
