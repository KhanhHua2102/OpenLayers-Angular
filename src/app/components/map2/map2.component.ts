import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { useGeographic } from 'ol/proj';
import { Map, Map as OpenMap, View } from 'ol';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import { GeoTIFFService } from 'src/app/services/loadGeoTiff.service';

@Component({
  selector: 'SLGA-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map2.component.html',
  styles: ``,
})
export class Map2Component implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef<HTMLElement>;
  mapComponent!: Map;

  constructor(private loadGeoTIFF: GeoTIFFService) {}

  ngOnInit() {
    useGeographic();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private async initMap() {
    const centerCoordinates = [133.775136, -25.274399]; // Center of Australia

    this.loadGeoTIFF.loadGeoTIFF().subscribe({
      next: (data) => {
        console.log('GeoJSON loaded:', data);
        const geoTiffObject = data;
      },
    });

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

    this.loadGeoTIFF.loadGeoTIFF().subscribe({
      next: (data) => {
        console.log('GeoJSON loaded:', data);
        const geoTiffObject = data;
        const rasterLayer = new TileLayer({
          source: geoTiffObject as any,
        });

        this.mapComponent.addLayer(rasterLayer);
      },
    });
  }
}
