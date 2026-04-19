import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService, Trip } from '../trip.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.html',
  styleUrls: ['./edit-trip.css'],
  standalone: false
})
export class EditTripComponent implements OnInit {
  trip: any = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    console.log('EditTrip: code from URL =', code);
    
    if (!code) {
      this.error = 'No trip code provided';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }
    
    this.tripService.getTrip(code).subscribe({
      next: (data: any) => {
        console.log('EditTrip: Raw data received =', data);
        
        // Handle different response formats
        let tripData = data;
        if (Array.isArray(data) && data.length > 0) {
          tripData = data[0];
        }
        
        this.trip = {
          code: tripData.code || '',
          name: tripData.name || '',
          length: tripData.length || '',
          start: tripData.start ? new Date(tripData.start).toISOString().split('T')[0] : '',
          resort: tripData.resort || '',
          perPerson: tripData.perPerson || '',
          image: tripData.image || '',
          description: tripData.description || ''
        };
        
        console.log('EditTrip: Processed trip =', this.trip);
        this.loading = false;
        this.cdr.detectChanges(); // Force view update
        console.log('EditTrip: loading set to false');
      },
      error: (err) => {
        console.error('EditTrip: Error loading trip =', err);
        this.error = 'Failed to load trip: ' + (err.message || 'Unknown error');
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    console.log('EditTrip: Submitting update for', this.trip.code);
    this.tripService.updateTrip(this.trip.code, this.trip).subscribe({
      next: () => {
        console.log('EditTrip: Update successful');
        alert('Trip updated successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('EditTrip: Update error =', err);
        alert('Failed to update trip: ' + (err.message || 'Unknown error'));
      }
    });
  }
}
