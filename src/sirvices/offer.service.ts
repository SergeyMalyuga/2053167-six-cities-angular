import {HttpClient} from '@angular/common/http';
import {Offer, OfferPreview} from '../types/offers';
import {APIRoute, BASE_URL} from '../const';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OffersService {
  constructor(private http: HttpClient) {
  }

  getOffers() {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/${APIRoute.Offers}`);
  }

  getOfferById(id: string) {
    return this.http.get<Offer>(`${BASE_URL}/${APIRoute.Offers}/${id}`);
  }
}
