import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';

import { weatherApi } from '../../config';
import { WeatherEntry } from '../models';

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

  getWeather$(
    city: string = 'Poland',
    targetDate: DateTime = DateTime.local()
  ): Observable<WeatherEntry[]> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pl&appid=${
      weatherApi.key
    }`;
    return this.http
      .get<WeatherEntry[]>(url)
      .pipe(map((weather: any) => weather.list.filter(filterWeatherByDate(targetDate))));
  }
}
