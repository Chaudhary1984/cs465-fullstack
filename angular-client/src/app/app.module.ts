import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TripListComponent } from './trip-list/trip-list';
import { TripCardComponent } from './trip-card/trip-card';
import { AddTripComponent } from './add-trip/add-trip';
import { EditTripComponent } from './edit-trip/edit-trip';
import { LoginComponent } from './login/login';
import { NavbarComponent } from './navbar/navbar';
import { StripHtmlPipe } from './strip-html.pipe';
import { JwtInterceptor } from './jwt.interceptor';

const routes: Routes = [
  { path: '', component: TripListComponent },
  { path: 'add', component: AddTripComponent },
  { path: 'edit/:code', component: EditTripComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripCardComponent,
    AddTripComponent,
    EditTripComponent,
    LoginComponent,
    NavbarComponent,
    StripHtmlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
