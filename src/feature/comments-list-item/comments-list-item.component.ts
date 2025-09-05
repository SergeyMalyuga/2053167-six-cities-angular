import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Comment } from '../../core/models/comments';
import { DateFormatPipe } from './date-format.pipe';

@Component({
  selector: 'app-comments-list-item',
  templateUrl: './comments-list-item.component.html',
  imports: [DateFormatPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsListItemComponent {
  @Input({ required: true }) public comment: Comment | undefined;
  public readonly Math = Math;
}
