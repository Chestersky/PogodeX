import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { WeatherService } from '../weather/weather.service';
import { DateTime } from 'luxon';
import { WeatherEntry } from '../models';
import { WeatherDate } from '../models/weather-date';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  user$: Observable<firebase.User>;
  weather$: Observable<WeatherEntry[]>;
  credentials: any = { email: 'mail@example.com', password: 'admin123#' };
  constructor(private auth: AuthService, private weatherService: WeatherService) {
    this.user$ = this.auth.user;
  }

  // Temporary \/
  signIn() {
    this.auth.signIn(this.credentials.email, this.credentials.password).subscribe();
  }

  signUp() {
    this.auth.signUp(this.credentials.email, this.credentials.password).subscribe();
  }

  signInWithFacebook() {
    this.auth.signInWithFacebook().subscribe();
  }

  signOut() {
    this.auth.signOut().subscribe();
  }

  getWeather(dateOffset: WeatherDate) {
    this.weather$ = this.weatherService.getWeather$(
      'Krakow',
      DateTime.local().plus({ day: dateOffset })
    );
  }
}
