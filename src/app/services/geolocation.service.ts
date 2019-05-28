import { Injectable } from '@angular/core';
import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation';
import { Observable, from, EMPTY, of } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { Coordinates } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  options: GeolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  constructor() {}

  watchPosition$(): Observable<Coordinates> {
    return Geolocation.watchPosition(this.options).pipe(
      map(this.mapPositionToCoords),
      catchError(error => {
        console.error(error.message);
        return EMPTY;
      })
    );
  }

  getCurrentPosition$(): Observable<Coordinates> {
    return from(Geolocation.getCurrentPosition(this.options)).pipe(
      map(this.mapPositionToCoords),
      catchError(error => {
        console.error(error.message);
        return of(null);
      })
    );
  }

  mapPositionToCoords(position: Geoposition | PositionError): Coordinates {
    if ('message' in position) {
      throw new Error(position.message);
    }
    return { longitude: position.coords.longitude, latitude: position.coords.latitude };
  }
}
