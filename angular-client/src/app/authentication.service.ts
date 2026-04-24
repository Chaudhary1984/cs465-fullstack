import { Injectable, Inject } from '@angular/core';
import { BROWSER_STORAGE } from './storage';
import { AuthResponse } from './auth-response';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage) {}

  getToken(): string { return this.storage.getItem('travlr-token') || ''; }
  saveToken(token: string): void { this.storage.setItem('travlr-token', token); }
  logout(): void { this.storage.removeItem('travlr-token'); }
  
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch { return false; }
  }
}
