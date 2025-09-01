import {Pipe, PipeTransform} from '@angular/core';
import {Comment} from '../../../core/models/comments';


@Pipe(
  {name: 'sortCommentsByDate'}
)

export class SortCommentsByDatePipe implements PipeTransform {
  transform(comments: Comment[]) {
    return comments.sort(this.sortByDate);
  }

  sortByDate(commentOne: Comment, commentTwo: Comment): number {
    const dateOne = new Date(commentOne.date).getTime();
    const dateTwo = new Date(commentTwo.date).getTime();
    return dateTwo - dateOne;
  }
}
