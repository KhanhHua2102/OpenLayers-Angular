import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { useGeographic } from 'ol/proj';
import { Map, Map as OpenMap, View } from 'ol';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';

import { GeoJsonService } from 'src/app/services/loadGeoJson.service';

@Component({
  selector: 'vegetation-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styles: ``,
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef<HTMLElement>;
  mapComponent!: OpenMap;
  geoJsonData: GeoJSON = new GeoJSON();
  http!: HttpClient;

  constructor(private geoJsonService: GeoJsonService, http: HttpClient) {}

  ngOnInit() {
    useGeographic();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {
    const centerCoordinates = [133.775136, -25.274399]; // Center of Australia

    const tileLayer = new TileLayer({
      source: new OSM(),
    });

    this.mapComponent = new Map({
      layers: [tileLayer],
      target: this.mapContainer.nativeElement,
      view: new View({
        center: centerCoordinates,
        zoom: 4,
      }),
    });

    this.loadGeoJSON();
  }

  private loadGeoJSON() {
    this.geoJsonService.loadGeoJSON().subscribe({
      next: (data) => {
        console.log('GeoJSON loaded');
        this.addVectorLayer(data);
      },
      error: (error) => {
        console.error('Error loading GeoJSON:', error);
      },
      complete: () => {
        console.log('GeoJSON loading completed');
      },
    });
  }

  private addVectorLayer(geojsonData: any) {
    if (geojsonData === null) {
      console.error('GeoJSON data is null');
      return;
    }
    const styles = {
      MultiPolygon: new Style({
        stroke: new Stroke({
          color: 'green',
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.1)',
        }),
      }),
    };

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonData),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource as any,
      style: styles['MultiPolygon'],
    });

    this.mapComponent.addLayer(vectorLayer);
  }
}
