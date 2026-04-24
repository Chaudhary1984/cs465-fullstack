import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TripService, Trip } from '../trip.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.html',
  styleUrls: ['./trip-list.css'],
  standalone: false
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  loading = true;
  error = '';

  constructor(
    private tripService: TripService,
    private cdr: ChangeDetectorRef,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void { this.loadTrips(); }

  isLoggedIn(): boolean { return this.authService.isLoggedIn(); }

  loadTrips() {
    this.loading = true;
    this.tripService.getTrips().subscribe({
      next: (data) => {
        this.trips = [...data];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load trips: ' + (err.message || 'Unknown error');
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteTrip(code: string) {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripService.deleteTrip(code).subscribe({ next: () => { this.loadTrips(); } });
    }
  }
}
