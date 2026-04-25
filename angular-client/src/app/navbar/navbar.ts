import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: false
})
export class NavbarComponent implements OnInit {
  logoExists = false;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    // Check if logo exists (optional)
  }

  isLoggedIn(): boolean { return this.authService.isLoggedIn(); }
  
  onLogout(): void { 
    this.authService.logout(); 
    this.router.navigate(['/']);
  }
}
