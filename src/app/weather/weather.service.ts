import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';

import { weatherApi } from '../../config';
import { WeatherEntry, Coordinates, Weather } from '../models';
import { GeolocationService } from '../geolocation/geolocation.service';

const filterWeatherByDate = (date: DateTime) => (weather: WeatherEntry) => {
  const weatherDate = DateTime.fromMillis(weather.dt * 1000).startOf('day');
  const targetDate = date.startOf('day');
  return weatherDate.equals(targetDate);
};

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  coords: Coordinates;
  constructor(private http: HttpClient, private geolocation: GeolocationService) {
    this.geolocation.getCurrentPosition$().subscribe(coords => (this.coords = coords));
  }

  getWeather$(targetDate: DateTime = DateTime.local()): Observable<Weather> {
    const query = this.coords
      ? `lat=${this.coords.latitude}&lon=${this.coords.longitude}`
      : `q=${'Krakow'}`;
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
