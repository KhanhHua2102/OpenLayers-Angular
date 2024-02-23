import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GeoJSON from 'ol/format/GeoJSON';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoJsonService {
  constructor(private http: HttpClient) {}

  loadGeoJSON(): Observable<any> {
    return this.http.get<GeoJSON>('assets/vegetation-datawa.geojson');
  }
}
