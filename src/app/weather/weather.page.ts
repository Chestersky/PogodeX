import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Weather, UserPreferences, WeatherDate, Gender, OutfitStyle } from 'app/models';
import { Observable } from 'rxjs';
import { AuthService, WeatherService, UserPrefService } from 'app/services';
import { DateTime } from 'luxon';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss']
})
export class WeatherPage implements OnInit {
  user$: Observable<firebase.User>;
  userPref$: Observable<UserPreferences>;
  weather: Weather;
  credentials: any = { email: 'mail@example.com', password: 'admin123#' };

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private weatherService: WeatherService,
    public userPrefService: UserPrefService
  ) {
    this.user$ = this.auth.user$;
    this.user$.subscribe(() => (this.userPref$ = this.userPrefService.userPreferences$));
    this.route.data
      .pipe(
        switchMap(({ date }) =>
          this.weatherService.getWeather$(DateTime.local().plus({ day: date }))
        )
      )
      .subscribe(weather => (this.weather = weather));
  }

  // Temporary \/
  /* signIn() {
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
  } */

  get temperature(): number {
    return Math.round(this.weather.list[0].main.temp);
  }

  get weatherState(): string {
    return this.weather.list[0].weather[0].description;
  }

  get weatherIcon(): string {
    const icons = {
      '01d': 'wi-day-sunny',
      '02d': 'wi-day-cloudy',
      '03d': 'wi-cloud',
      '04d': 'wi-cloudy',
      '09d': 'wi-day-showers',
      '10d': 'wi-day-rain',
      '11d': 'wi-day-thunderstorm',
      '13d': 'wi-day-snow',
      '50d': 'wi-day-fog',
      '01n': 'wi-night-clear',
      '02n': 'wi-night-cloudy',
      '03n': 'wi-cloud',
      '04n': 'wi-cloudy',
      '09n': 'wi-night-showers',
      '10n': 'wi-night-rain',
      '11n': 'wi-night-thunderstorm',
      '13n': 'wi-night-snow',
      '50n': 'wi-night-fog'
    };
    const iconId = this.weather.list[0].weather[0].icon;
    return icons[iconId];
  }

  setUserPref() {
    this.userPrefService.setUserPreferences({ gender: Gender.Male });
  }

  changeGender(gender: Gender) {
    this.userPrefService.updateUserPreferences({ gender });
  }

  changeOutfitStyle(outfitStyle: OutfitStyle) {
    this.userPrefService.updateUserPreferences({ outfitStyle });
  }

  ngOnInit() {}
}
