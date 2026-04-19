import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.html',
  styleUrls: ['./add-trip.css'],
  standalone: false
})
export class AddTripComponent {
  trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  constructor(private tripService: TripService, private router: Router) { }

  onSubmit() {
    // Convert empty string to valid date format or remove
    const tripData: any = { ...this.trip };
    if (!tripData.start) {
      delete tripData.start;
    }
    
    this.tripService.addTrip(tripData).subscribe({
      next: () => {
        alert('Trip added successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error adding trip', err);
        alert('Failed to add trip');
      }
    });
  }
}
