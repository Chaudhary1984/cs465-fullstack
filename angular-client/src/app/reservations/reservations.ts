import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.html',
  styleUrls: ['./reservations.css'],
  standalone: false
})
export class ReservationsComponent implements OnInit {
  isLoggedIn = false;
  reservations = [
    { id: 'RES001', destination: 'Cancun', date: 'May 15, 2025', status: 'Confirmed', price: '$799' },
    { id: 'RES002', destination: 'Bahamas', date: 'June 20, 2025', status: 'Pending', price: '$1,299' }
  ];

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }
}
