import { HttpClient } from '@angular/common/http';

import { APIRoute, BASE_URL } from '../constants/const';
import { Comment } from '../models/comments';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http: HttpClient = inject(HttpClient);

  public getComments(id: string | undefined): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${BASE_URL}/${APIRoute.Comments}/${id}`);
  }

  public postComment(
    id: string | undefined,
    comment: string,
    rating: number
  ): Observable<Comment> {
    return this.http.post<Comment>(`${BASE_URL}/${APIRoute.Comments}/${id}`, {
      comment,
      rating,
    });
  }
}
