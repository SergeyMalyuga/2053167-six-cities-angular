import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {Comment} from '../../core/models/comments';
import {CommentService} from '../../core/services/comment.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  imports: [
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CommentFormComponent implements AfterViewInit {

  @Input() comments!: WritableSignal<Comment[]>;
  @Input() offerId!: string | undefined;
  @Output() newCommentCreated = new EventEmitter();
  @ViewChild('commentSubmitButton') commentSubmitButton!: ElementRef;

  private newComment = signal({comment: 'This comment has a comment.', rating: 0});
  private commentService = inject(CommentService);
  private commentSubmitButtonNative: HTMLButtonElement | null = null;
  private formBuilder = inject(FormBuilder);

  protected commentForm = this.formBuilder.group({
    comment: ['', [Validators.required, Validators.minLength(50)]],
    rating: ['', Validators.required],
  });

  ngAfterViewInit(): void {
    this.commentSubmitButtonNative = this.commentSubmitButton.nativeElement as HTMLButtonElement;
  }

  onInputComment(): void {
    this.commentForm.valueChanges.subscribe(({comment}) => {
      if (comment) {
        this.newComment.set({...this.newComment(), comment})
      }
    });
  }

  onRatingChanged(): void {
    const rating = Number(this.commentForm.value['rating']);
    if (rating) {
      this.newComment.set({...this.newComment(), rating});
    }
  }

  onSubmit(evt: Event): void {
    evt.preventDefault();
    if (this.commentSubmitButtonNative) {
      this.commentSubmitButtonNative.disabled = true;
    }
    this.commentService.postComment(this.offerId, this.newComment().comment, this.newComment().rating)
      .subscribe({
        next: (offer) => this.newCommentCreated.emit(offer),
        error: () => this.unlockCommentSubmitButton(),
        complete: () => {
          this.unlockCommentSubmitButton();
          this.newComment.set({comment: '', rating: 0});
          this.commentForm.reset({
            comment: '',
            rating: null
          })
        },
      })
  }

  private unlockCommentSubmitButton() {
    if (this.commentSubmitButtonNative) {
      this.commentSubmitButtonNative.disabled = false;
    }
  }
}
