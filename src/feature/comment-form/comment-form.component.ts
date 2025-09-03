import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { Comment } from '../../core/models/comments';
import { CommentService } from '../../core/services/comment.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ToggleDisableButtonDirective } from '../../shared/directives/toggle-disable-button';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  imports: [ReactiveFormsModule, ToggleDisableButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent implements OnDestroy, OnInit {
  @Input() public comments!: WritableSignal<Comment[]>;
  @Input() public offerId!: string | undefined;
  @Output() public newCommentCreated = new EventEmitter();

  private newComment = signal({
    comment: 'This comment has a comment.',
    rating: 0,
  });
  private commentService = inject(CommentService);
  private formBuilder = inject(FormBuilder);
  private destroy$ = new Subject<void>();

  public commentForm = this.formBuilder.group({
    comment: ['', [Validators.required, Validators.minLength(50)]],
    rating: ['', Validators.required],
  });
  public isDisabled = signal<boolean>(false);

  ngOnInit(): void {
    this.commentForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ comment }) => {
        if (comment) {
          this.newComment.set({ ...this.newComment(), comment });
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onRatingChanged(): void {
    const rating = Number(this.commentForm.value['rating']);
    if (rating) {
      this.newComment.set({ ...this.newComment(), rating });
    }
  }

  public onSubmit(evt: Event): void {
    evt.preventDefault();
    this.isDisabled.set(true);
    this.commentService
      .postComment(
        this.offerId,
        this.newComment().comment,
        this.newComment().rating
      )
      .subscribe({
        next: offer => this.newCommentCreated.emit(offer),
        error: () => this.isDisabled.set(false),
        complete: () => {
          this.isDisabled.set(false);
          this.newComment.set({ comment: '', rating: 0 });
          this.commentForm.reset({
            comment: '',
            rating: null,
          });
        },
      });
  }
}
