import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../trip.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: false
})
export class LoginComponent {
  formError = '';
  credentials = { name: '', email: '', password: '' };

  constructor(
    private router: Router,
    private tripService: TripService,
    private authService: AuthenticationService
  ) {}

  onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required';
      return;
    }
    this.tripService.login(this.credentials.email, this.credentials.password).subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.saveToken(response.token);
          this.router.navigate(['/']);
        }
      },
      error: () => { this.formError = 'Invalid email or password'; }
    });
  }
}
