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
import { RegisterComponent } from './register/register';
import { NavbarComponent } from './navbar/navbar';
import { NewsComponent } from './news/news';
import { ReservationsComponent } from './reservations/reservations';
import { CheckoutComponent } from './checkout/checkout';
import { AdminComponent } from './admin/admin';
import { StripHtmlPipe } from './strip-html.pipe';
import { JwtInterceptor } from './jwt.interceptor';

const routes: Routes = [
  { path: '', component: TripListComponent },
  { path: 'travel', component: TripListComponent },
  { path: 'add', component: AddTripComponent },
  { path: 'edit/:code', component: EditTripComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'news', component: NewsComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripCardComponent,
    AddTripComponent,
    EditTripComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    NewsComponent,
    ReservationsComponent,
    CheckoutComponent,
    AdminComponent,
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
