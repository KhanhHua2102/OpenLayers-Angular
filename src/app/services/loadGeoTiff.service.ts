import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GeoTIFF from 'geotiff';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoTIFFService {
  constructor(private http: HttpClient) {}

  loadGeoTIFF(): Observable<GeoTIFF> {
    const url =
      'api/landscapes/slga/NationalMaps/SoilAndLandscapeGrid/AWC/AWC_000_005_EV_N_P_AU_TRN_N_20210614.tif';
    const apikey =
      'MVk1bWx4WnpuU0QzZXBDci4uYy0iSio1DTYNOlIrCTMrN3gyJ3tEMl0yLjw+P2lcbUFwPWJ7TAo7Q0ggIyRTQ3RLakEJb019XSQiS3VqDVg9';
    const headers = new HttpHeaders({
      Range: 'bytes=0-5000',
      'x-api-key': apikey,
    });

    return this.http.get<GeoTIFF>(url, { headers: headers });
  }
}
