import { HttpClient } from '@angular/common/http';
import { Offer, OfferPreview } from '../models/offers';
import { APIRoute, BASE_URL } from '../constants/const';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  private http: HttpClient = inject(HttpClient);

  public getOffers(): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/${APIRoute.Offers}`);
  }

  public getOfferById(id: string): Observable<Offer> {
    return this.http.get<Offer>(`${BASE_URL}/${APIRoute.Offers}/${id}`);
  }

  public getNearbyOffers(id: string | undefined): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(
      `${BASE_URL}/${APIRoute.Offers}/${id}/nearby`
    );
  }
}
