import {Component, Input, signal, WritableSignal} from '@angular/core';
import {nanoid} from 'nanoid';
import {Comment} from '../types/comments';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
})

export class CommentFormComponent {
  @Input() comments!: WritableSignal<Comment[]>;
  newComment = signal({comment: 'This comment has a comment.', rating: 0});

  onInputComment(evt: Event): void {
    const target = evt.target as HTMLTextAreaElement;
    this.newComment.set({...this.newComment(), comment: target.value});
  }

  onRatingChanged(evt: Event): void {
    const target = evt.target as HTMLInputElement;
    const rating = Number(target.value);
    this.newComment.set({...this.newComment(), rating});
  }

  onSubmit(evt: Event): void {
    evt.preventDefault();
    const newComments= this.comments();
    newComments.push({
      id: nanoid(),
      date: '2019-05-08T14:13:56.569Z',
      user: {
        name: 'Oliver Conner',
        avatarUrl: 'img/avatar-max.jpg',
        isPro: false
      },
      comment: this.newComment().comment,
      rating: this.newComment().rating
    });
    this.comments.set(newComments)
  }
}
