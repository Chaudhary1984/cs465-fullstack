import { Component, OnInit } from '@angular/core';
import { TripService, Trip } from '../trip.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
  standalone: false
})
export class AdminComponent implements OnInit {
  trips: Trip[] = [];
  selectedTab = 'travel';
  
  newTrip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };
  
  editMode = false;
  editTripCode = '';

  constructor(
    private tripService: TripService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripService.getTrips().subscribe({
      next: (data) => { this.trips = data; },
      error: (err) => { console.error('Error loading trips', err); }
    });
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  onSubmit(): void {
    if (this.editMode) {
      this.tripService.updateTrip(this.editTripCode, this.newTrip).subscribe({
        next: () => {
          this.resetForm();
          this.loadTrips();
          alert('Trip updated successfully!');
        },
        error: (err) => { alert('Error updating trip: ' + err.message); }
      });
    } else {
      this.tripService.addTrip(this.newTrip).subscribe({
        next: () => {
          this.resetForm();
          this.loadTrips();
          alert('Trip added successfully!');
        },
        error: (err) => { alert('Error adding trip: ' + err.message); }
      });
    }
  }

  editTrip(trip: Trip): void {
    this.editMode = true;
    this.editTripCode = trip.code;
    this.newTrip = { ...trip };
    if (this.newTrip.start) {
      this.newTrip.start = new Date(this.newTrip.start).toISOString().split('T')[0];
    }
  }

  deleteTrip(code: string): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripService.deleteTrip(code).subscribe({
        next: () => { this.loadTrips(); alert('Trip deleted!'); },
        error: (err) => { alert('Error deleting trip: ' + err.message); }
      });
    }
  }

  resetForm(): void {
    this.editMode = false;
    this.editTripCode = '';
    this.newTrip = {
      code: '', name: '', length: '', start: '', resort: '', perPerson: '', image: '', description: ''
    };
  }
}
