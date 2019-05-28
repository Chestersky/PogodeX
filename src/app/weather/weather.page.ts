import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Weather, UserPreferences, WeatherDate, Gender } from 'app/models';
import { Observable } from 'rxjs';
import { AuthService, WeatherService, UserPrefService } from 'app/services';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss']
})
export class WeatherPage implements OnInit {
  user$: Observable<firebase.User>;
  userPref$: Observable<UserPreferences>;
  weather$: Observable<Weather>;
  credentials: any = { email: 'mail@example.com', password: 'admin123#' };

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private weatherService: WeatherService,
    public userPrefService: UserPrefService
  ) {
    this.user$ = this.auth.user$;
    this.user$.subscribe(() => (this.userPref$ = this.userPrefService.userPreferences$));
    this.route.data.subscribe(data => console.log({ data }));
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
    this.weather$ = this.weatherService.getWeather$(DateTime.local().plus({ day: dateOffset }));
  }

  setUserPref() {
    this.userPrefService.setUserPreferences({ gender: Gender.Male });
  }

  changeGender(gender: Gender) {
    this.userPrefService.updateUserPreferences({ gender });
  }

  ngOnInit() {}
}
