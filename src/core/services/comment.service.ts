import {HttpClient} from '@angular/common/http';

import {APIRoute, BASE_URL} from '../constants/const';
import {Comment} from '../models/comments';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  constructor(private http: HttpClient) {
  }

  getComments(id: string | undefined) {
    return this.http.get<Comment[]>(`${BASE_URL}/${APIRoute.Comments}/${id}`)
  }

  postComment(id: string | undefined, comment: string, rating: number) {
    return this.http.post<Comment>(`${BASE_URL}/${APIRoute.Comments}/${id}`, {comment, rating})
  }
}
