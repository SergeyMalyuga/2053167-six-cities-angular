import {Component, inject, OnInit, signal} from '@angular/core';
import {CardComponent} from '../card/card.component';
import {OfferPreview} from '../types/offers';
import {MockOffersService} from '../mock-offers-service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  imports: [CardComponent]
})

export class MainPageComponent implements  OnInit {
  offers: OfferPreview[] = [];
  mockOffersService = inject(MockOffersService);
  countOffers = signal(5);

  ngOnInit(): void {
    this.offers = this.mockOffersService.getOffers();
  }
}
