import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from '../trip.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css'],
  standalone: false
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() delete = new EventEmitter<string>();

  constructor(private authService: AuthenticationService) {}

  isLoggedIn(): boolean { return this.authService.isLoggedIn(); }

  deleteTrip() { this.delete.emit(this.trip.code); }
}
