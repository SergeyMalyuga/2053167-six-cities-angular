import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

import * as L from 'leaflet';
import {OfferPreview} from '../types/offers';
import {offers} from '../mocks/offers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() activeCard!: OfferPreview | null;
  @Input() offers: OfferPreview[] = [];

  private markers: L.Marker[] = [];
  private map!: L.Map;
  private centroid: L.LatLngExpression = [52.3909553943508, 4.85309666406198];

    private defaultCustomIcon = new L.Icon({
      iconUrl: '/img/pin.svg',
      iconSize: [27, 39],
      iconAnchor: [20, 40]
    });

  private currentCustomIcon = new L.Icon({
    iconUrl: 'img/pin-active.svg',
    iconSize: [27, 39],
    iconAnchor: [20, 40]
  });

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this.addMarkers();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) return;
    if (changes['activeCard']) {
      this.markers.forEach(marker => this.map.removeLayer(marker));
      this.markers = [];
      this.addMarkers();
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private addMarkers(): void {
    offers.forEach(offer => {
      const marker = L.marker([offer.location.latitude, offer.location.longitude] as L.LatLngExpression);
      this.markers.push(marker);
      marker.setIcon(this.activeCard !== null && this.activeCard.id === offer.id ?
        this.currentCustomIcon
        :
        this.defaultCustomIcon
      ).addTo(this.map);
    })
  }
}
