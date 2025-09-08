import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { Comment } from '../../core/models/comments';
import { CommentService } from '../../core/services/comment.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ToggleDisableButtonDirective } from '../../shared/directives/toggle-disable-button';
import { CommentFormValue } from '../../core/models/comment-form-value';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  imports: [ReactiveFormsModule, ToggleDisableButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent implements OnDestroy {
  @Input({ required: true }) public comments!: Comment[];
  @Input({ required: true }) public offerId!: string | undefined;
  @Output() public newCommentCreated: EventEmitter<Comment> =
    new EventEmitter<Comment>();

  private commentService = inject(CommentService);
  private formBuilder = inject(FormBuilder);
  private destroySubject = new Subject<void>();

  public commentForm = this.formBuilder.group({
    comment: ['', [Validators.required, Validators.minLength(50)]],
    rating: ['', Validators.required],
  });
  public isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  public ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  public onSubmit(evt: Event): void {
    evt.preventDefault();
    if (this.commentForm.valid) {
      const { comment, rating } = this.commentForm.value as CommentFormValue;
      this.isDisabled.set(true);
      this.commentService
        .postComment(this.offerId, comment, Number(rating))
        .pipe(takeUntil(this.destroySubject))
        .subscribe({
          next: (comment: Comment) => this.newCommentCreated.emit(comment),
          error: () => this.isDisabled.set(false),
          complete: () => {
            this.isDisabled.set(false);
            this.commentForm.reset({
              comment: '',
              rating: null,
            });
          },
        });
    }
  }
}
