import { WeatherEntry } from './weather-entry';

export interface Weather {
  city: {
    coord: { lat: number; lon: number };
    country: string;
    id: number;
    name: string;
    timezone: number;
  };
  list: WeatherEntry[];
}
