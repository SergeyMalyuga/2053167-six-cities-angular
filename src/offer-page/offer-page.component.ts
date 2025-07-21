import {Component, signal} from '@angular/core';
import {CommentFormComponent} from '../comment-form/comment-form.component';
import {comments} from '../mocks/comments';
import {Comment} from '../types/comments';
import {CommentsListItemComponent} from '../comments-list-item/comments-list-item.component';

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  imports: [CommentFormComponent, CommentsListItemComponent]
})

export class OfferPageComponent {
  comments = signal<Comment[]>(comments)
}
