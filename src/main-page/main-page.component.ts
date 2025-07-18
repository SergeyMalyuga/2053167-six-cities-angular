import {Component, inject, OnInit, signal} from '@angular/core';
import {OfferPreview} from '../types/offers';
import {MockOffersService} from '../mock-offers-service';
import {OffersListComponent} from '../offers-list/offers-list.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  imports: [OffersListComponent]
})

export class MainPageComponent implements  OnInit {
  offers: OfferPreview[] = [];
  mockOffersService = inject(MockOffersService);
  countOffers = signal(5);

  ngOnInit(): void {
    this.offers = this.mockOffersService.getOffers();
  }
}
