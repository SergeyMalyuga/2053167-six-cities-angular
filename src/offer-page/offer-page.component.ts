import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CommentFormComponent} from '../comment-form/comment-form.component';
import {comments} from '../mocks/comments';
import {Comment} from '../types/comments';
import {CommentListComponent} from '../comment-list/comment-list.component';

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  imports: [CommentFormComponent, CommentListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OfferPageComponent {
  comments = signal<Comment[]>(comments)
}
