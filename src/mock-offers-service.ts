import {inject, Injectable} from '@angular/core';
import {offers} from './mocks/offers';

@Injectable({
  providedIn: 'root'
})

export class MockOffersService {
  getOffers() {
    return offers;
  }
}
