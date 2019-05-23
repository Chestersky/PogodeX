export interface WeatherEntry {
  clouds: { all: string };
  dt: number;
  dt_txt: string;
  main: {
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  rain: { '3h': number };
  sys: { pod: string };
  weather: [{ description: string; icon: string; id: number; main: string }];
  wind: { speed: number; deg: number };
}
