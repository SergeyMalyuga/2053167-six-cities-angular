import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../sirvices/auth.service';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<Request>, next: HttpHandler) {
    const token = this.authService.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', token)
    });
    return next.handle(authReq);
  }
}
