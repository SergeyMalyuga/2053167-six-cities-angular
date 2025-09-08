import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer, OfferPreview } from '../models/offers';
import { APIRoute, BASE_URL } from '../constants/const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOffersService {
  private http = inject(HttpClient);

  public getFavoriteOffers(): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/${APIRoute.Favorite}`);
  }

  public changeOfferStatus(
    id: string | undefined,
    status: number
  ): Observable<Offer> {
    return this.http.post<Offer>(
      `${BASE_URL}/${APIRoute.Favorite}/${id}/${status}`,
      {}
    );
  }
}
