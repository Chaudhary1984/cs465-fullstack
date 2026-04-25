import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../trip.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: false
})
export class RegisterComponent {
  formError = '';
  successMessage = '';
  credentials = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  agreeTerms = false;

  constructor(
    private router: Router,
    private tripService: TripService,
    private authService: AuthenticationService
  ) {}

  onRegisterSubmit(): void {
    this.formError = '';
    this.successMessage = '';

    if (!this.credentials.name || !this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required';
      return;
    }

    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.formError = 'Passwords do not match';
      return;
    }

    if (!this.agreeTerms) {
      this.formError = 'You must agree to the Terms of Use and Privacy Policy';
      return;
    }

    this.tripService.register(this.credentials.name, this.credentials.email, this.credentials.password).subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.saveToken(response.token);
          this.successMessage = 'Registration successful! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
      },
      error: (err) => {
        this.formError = 'Registration failed: ' + (err.error?.message || 'Unknown error');
      }
    });
  }
}
