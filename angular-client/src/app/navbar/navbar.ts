import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: false
})
export class NavbarComponent {
  constructor(private authService: AuthenticationService) {}
  isLoggedIn(): boolean { return this.authService.isLoggedIn(); }
  onLogout(): void { this.authService.logout(); }
}
