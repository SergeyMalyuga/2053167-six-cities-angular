import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Offer, OfferPreview} from '../models/offers';
import {APIRoute, BASE_URL} from '../constants/const';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class FavoriteOffersService {

  constructor(private http: HttpClient) {}

  getFavoriteOffers() {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/${APIRoute.Favorite}`);
  }

  changeOfferStatus(id: string | undefined, status: number) {
    return this.http.post<Offer>(`${BASE_URL}/${APIRoute.Favorite}/${id}/${status}`, {})
  }
}
