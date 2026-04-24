import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BROWSER_STORAGE } from './storage';
import { AuthResponse } from './auth-response';

export interface Trip {
  _id?: string;
  code: string;
  name: string;
  length: string;
  start: any;
  resort: string;
  perPerson: string;
  image: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class TripService {
  private apiUrl = 'http://localhost:3000/api/trips';
  private authUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) { }

  getTrips(): Observable<Trip[]> { return this.http.get<Trip[]>(this.apiUrl); }
  getTrip(code: string): Observable<any> { return this.http.get(`${this.apiUrl}/${code}`); }
  addTrip(trip: Trip): Observable<Trip> { return this.http.post<Trip>(this.apiUrl, trip); }
  updateTrip(code: string, trip: Trip): Observable<Trip> { return this.http.put<Trip>(`${this.apiUrl}/${code}`, trip); }
  deleteTrip(code: string): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${code}`); }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/register`, { name, email, password });
  }
}
