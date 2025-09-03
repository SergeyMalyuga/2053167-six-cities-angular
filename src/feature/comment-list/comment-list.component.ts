import { Component, Input } from '@angular/core';
import { CommentsListItemComponent } from '../comments-list-item/comments-list-item.component';
import { Comment } from '../../core/models/comments';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  imports: [CommentsListItemComponent],
})
export class CommentListComponent {
  @Input() comments: Comment[] = [];
}
