import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommentsListItemComponent} from '../comments-list-item/comments-list-item.component';
import {Comment} from '../types/comments';

@Component({
    selector: 'app-comment-list',
    templateUrl: './comment-list.component.html',
    imports: [
        CommentsListItemComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CommentListComponent {
    @Input() comments: Comment[] = [];
}
