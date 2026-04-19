import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TripListComponent } from './trip-list/trip-list';
import { TripCardComponent } from './trip-card/trip-card';
import { AddTripComponent } from './add-trip/add-trip';
import { EditTripComponent } from './edit-trip/edit-trip';
import { StripHtmlPipe } from './strip-html.pipe';

const routes: Routes = [
  { path: '', component: TripListComponent },
  { path: 'add', component: AddTripComponent },
  { path: 'edit/:code', component: EditTripComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripCardComponent,
    AddTripComponent,
    EditTripComponent,
    StripHtmlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
