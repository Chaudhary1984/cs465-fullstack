import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAuthAPI = req.url.includes('login') || req.url.includes('register');
    const token = this.authService.getToken();
    
    if (this.authService.isLoggedIn() && !isAuthAPI && token) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    return next.handle(req);
  }
}

export const authInterceptProvider = { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true };
