import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, EMPTY } from 'rxjs';
import { WeatherService } from '../weather/weather.service';
import { DateTime } from 'luxon';
import { Weather, UserPreferences, Gender } from '../models';
import { WeatherDate } from '../models/weather-date';
import { GeolocationService } from '../geolocation/geolocation.service';
import { switchMap } from 'rxjs/operators';
import { UserPrefService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  user$: Observable<firebase.User>;
  userPref$: Observable<UserPreferences>;
  weather$: Observable<Weather>;
  coordinates$: Observable<any>;
  position: any;
  credentials: any = { email: 'mail@example.com', password: 'admin123#' };
  constructor(
    private auth: AuthService,
    private weatherService: WeatherService,
    private geolocation: GeolocationService,
    public userPrefService: UserPrefService
  ) {
    this.user$ = this.auth.user$;
    this.coordinates$ = this.geolocation.getCurrentPosition$();
    this.user$.subscribe(() => (this.userPref$ = this.userPrefService.userPreferences$));
  }

  // Temporary \/
  signIn() {
    this.auth.signIn(this.credentials.email, this.credentials.password);
  }

  signUp() {
    this.auth.signUp(this.credentials.email, this.credentials.password);
  }

  signInWithFacebook() {
    this.auth.signInWithFacebook();
  }

  signOut() {
    this.auth.signOut();
  }

  getWeather(dateOffset: WeatherDate) {
    this.weather$ = this.coordinates$.pipe(
      switchMap(coords =>
        this.weatherService.getWeather$(coords, DateTime.local().plus({ day: dateOffset }))
      )
    );
  }

  setUserPref() {
    this.userPrefService.setUserPreferences({ gender: null });
  }

  changeGender(gender: Gender) {
    this.userPrefService.updateUserPreferences({ gender });
  }
}
