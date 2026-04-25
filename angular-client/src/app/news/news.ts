import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.html',
  styleUrls: ['./news.css'],
  standalone: false
})
export class NewsComponent {
  newsItems = [
    { title: 'New Beach Destinations Added!', date: 'April 15, 2025', description: 'Check out our new beach destinations in the Caribbean.' },
    { title: 'Summer Sale - 20% Off', date: 'April 10, 2025', description: 'Book your summer vacation now and save 20% on select packages.' },
    { title: 'New Cruise Packages', date: 'April 5, 2025', description: 'Explore our new luxury cruise packages.' },
    { title: 'Travel Advisory Update', date: 'April 1, 2025', description: 'Updated travel guidelines for international destinations.' }
  ];
}
