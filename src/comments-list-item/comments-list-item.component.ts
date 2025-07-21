import {Component, Input} from '@angular/core';
import {Comment} from '../types/comments';
import {DateFormatPipe} from './date-format';

@Component({
  selector: 'app-comments-list-item',
  templateUrl: './comments-list-item.component.html',
  imports: [DateFormatPipe]
})

export class CommentsListItemComponent {
  @Input() comment: Comment | undefined;
  protected readonly Math = Math;
}
