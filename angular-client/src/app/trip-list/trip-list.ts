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
  filteredTrips: Trip[] = [];
  loading = true;
  error = '';
  searchTerm = '';
  selectedTab = 'beaches';

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
        this.filterTrips();
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

  get beachCount(): number {
    return this.trips.filter(t => t.name.toLowerCase().includes('reef') || t.name.toLowerCase().includes('beach')).length;
  }

  get cruiseCount(): number {
    return this.trips.filter(t => t.name.toLowerCase().includes('cruise') || t.name.toLowerCase().includes('dawson')).length;
  }

  get mountainCount(): number {
    return this.trips.filter(t => t.name.toLowerCase().includes('mountain') || t.resort.toLowerCase().includes('cove')).length;
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.filterTrips();
  }

  filterTrips(): void {
    let filtered = [...this.trips];
    
    // Filter by tab
    if (this.selectedTab === 'beaches') {
      filtered = filtered.filter(t => t.name.toLowerCase().includes('reef') || t.name.toLowerCase().includes('beach'));
    } else if (this.selectedTab === 'cruises') {
      filtered = filtered.filter(t => t.name.toLowerCase().includes('cruise') || t.name.toLowerCase().includes('dawson'));
    } else if (this.selectedTab === 'mountains') {
      filtered = filtered.filter(t => t.name.toLowerCase().includes('mountain') || t.resort.toLowerCase().includes('cove'));
    }
    
    // Filter by search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(term) || 
        t.resort.toLowerCase().includes(term) ||
        t.code.toLowerCase().includes(term)
      );
    }
    
    this.filteredTrips = filtered;
  }

  deleteTrip(code: string) {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripService.deleteTrip(code).subscribe({ 
        next: () => { this.loadTrips(); },
        error: (err) => { alert('Failed to delete trip: ' + err.message); }
      });
    }
  }
}
