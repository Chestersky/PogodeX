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
    const icon = this.weather.list[0].weather[0].icon;
    return `http://openweathermap.org/img/w/${icon}.png`;
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
