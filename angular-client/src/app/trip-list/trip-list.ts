import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TripService, Trip } from '../trip.service';

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
    private cdr: ChangeDetectorRef
  ) {
    console.log('TripListComponent: Constructor called');
  }

  ngOnInit(): void {
    console.log('TripListComponent: ngOnInit called');
    this.loadTrips();
  }

  loadTrips() {
    console.log('TripListComponent: loadTrips called');
    this.loading = true;
    this.tripService.getTrips().subscribe({
      next: (data) => {
        console.log('TripListComponent: Data received, count =', data ? data.length : 0);
        console.log('TripListComponent: First trip =', data && data[0] ? data[0].name : 'none');
        this.trips = [...data]; // Create a new array reference
        this.loading = false;
        this.cdr.detectChanges(); // Force change detection
        console.log('TripListComponent: trips array length after assignment =', this.trips.length);
      },
      error: (err) => {
        console.error('TripListComponent: Error:', err);
        this.error = 'Failed to load trips: ' + (err.message || 'Unknown error');
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteTrip(code: string) {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripService.deleteTrip(code).subscribe({
        next: () => {
          this.loadTrips();
        },
        error: (err) => {
          console.error('Failed to delete trip', err);
          alert('Failed to delete trip');
        }
      });
    }
  }
}
