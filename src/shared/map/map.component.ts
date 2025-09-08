import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import * as L from 'leaflet';
import { OfferPreview } from '../../core/models/offers';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { City } from '../../core/models/city';
import { selectCity } from '../../store/app/app.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input({required: true}) public activeCard!: OfferPreview | null;
  @Input({required: true}) public offers: OfferPreview[] = [];

  private destroySubject = new Subject<void>();
  private currentCity!: City;
  private markers: L.Marker[] = [];
  private map!: L.Map;
  private centroid!: L.LatLngExpression;
  private store = inject(Store<AppState>);

  public ngOnInit(): void {
    this.store
      .select(selectCity)
      .pipe(takeUntil(this.destroySubject))
      .subscribe(city => (this.currentCity = city));
    this.centroid = [
      this.currentCity.location.latitude,
      this.currentCity.location.longitude,
    ];
  }

  private defaultCustomIcon = new L.Icon({
    iconUrl: '/img/pin.svg',
    iconSize: [27, 39],
    iconAnchor: [20, 40],
  });

  private currentCustomIcon = new L.Icon({
    iconUrl: 'img/pin-active.svg',
    iconSize: [27, 39],
    iconAnchor: [20, 40],
  });

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 10,
    });

    const tiles = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
    this.addMarkers();
  }

  public ngAfterViewInit(): void {
    this.initMap();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) return;
    if (changes['activeCard']) {
      this.markers.forEach(marker => this.map.removeLayer(marker));
      this.markers = [];
      this.addMarkers();
    }
    if (changes['offers']) {
      this.markers.forEach(marker => this.map.removeLayer(marker));
      this.addMarkers();
      this.map.setView(
        [
          this.currentCity.location.latitude,
          this.currentCity.location.longitude,
        ],
        10,
        { animate: true }
      );
    }
  }

  public ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  private addMarkers(): void {
    this.offers?.forEach(offer => {
      const marker = L.marker([
        offer.location.latitude,
        offer.location.longitude,
      ] as L.LatLngExpression);
      this.markers.push(marker);
      marker
        .setIcon(
          this.activeCard !== null && this.activeCard?.id === offer.id
            ? this.currentCustomIcon
            : this.defaultCustomIcon
        )
        .addTo(this.map);
    });
  }
}
