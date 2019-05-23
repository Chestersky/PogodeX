import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';

import { weatherApi } from '../../config';
import { WeatherEntry, Coordinates, Weather } from '../models';

const filterWeatherByDate = (date: DateTime) => (weather: WeatherEntry) => {
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
    location?: Coordinates,
    targetDate: DateTime = DateTime.local()
  ): Observable<Weather> {
    const query = location ? `lat=${location.latitude}&lon=${location.longitude}` : `q=${'Krakow'}`;
    const url = `https://api.openweathermap.org/data/2.5/forecast?${query}&units=metric&lang=pl&appid=${
      weatherApi.key
    }`;
    return this.http.get<Weather>(url).pipe(
      map((weather: any) => ({
        city: weather.city,
        list: weather.list.filter(filterWeatherByDate(targetDate))
      }))
    );
  }
}
