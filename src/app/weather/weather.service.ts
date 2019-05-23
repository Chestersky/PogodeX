import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';

import { weatherApi } from '../../config/weather-api';

const filterWeatherByDate = (date: DateTime) => weather => {
  const weatherDate = DateTime.fromMillis(weather.dt * 1000).startOf('day');
  const targetDate = date.startOf('day');
  return weatherDate.equals(targetDate);
};

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather$(city: string = 'Poland', targetDate: DateTime = DateTime.local()): Observable<any> {
    return this.http
      .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApi.key}`)
      .pipe(map((weather: any) => weather.list.filter(filterWeatherByDate(targetDate))));
  }
}
