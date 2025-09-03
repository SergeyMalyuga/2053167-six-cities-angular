import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { CommentFormComponent } from '../../feature/comment-form/comment-form.component';
import { Comment } from '../../core/models/comments';
import { CommentListComponent } from '../../feature/comment-list/comment-list.component';
import { MapComponent } from '../../shared/map/map.component';
import { OffersListNearbyComponent } from '../../feature/offers-list-nearby/offers-list-nearby.component';
import { AppRoute } from '../../app/app.routes';
import { HeaderComponent } from '../../shared/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from '../../core/services/offer.service';
import { Offer, OfferPreview } from '../../core/models/offers';
import {
  combineLatest,
  filter,
  finalize,
  of,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { CapitalizePipe } from '../../shared/card/capitalize.pipe';
import { User } from '../../core/models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import {
  selectAuthorizationStatus,
  selectFavoriteOffersIsLoading,
  selectUser,
} from '../../store/app/app.selectors';
import { AuthorizationStatus } from '../../core/constants/const';
import { CommentService } from '../../core/services/comment.service';
import { SortCommentsByDatePipe } from './pipe/sort-comments-by-date.pipe';
import { changeFavoriteStatus } from '../../store/app/app.actions';
import { LimitToThreeOffersPipe } from '../../feature/offers-list-nearby/limit-to-three-offers.pipe';

@Component({
  selector: 'app-offer',
  templateUrl: './offer-page.component.html',
  imports: [
    CommentFormComponent,
    CommentListComponent,
    MapComponent,
    OffersListNearbyComponent,
    HeaderComponent,
    LoaderComponent,
    CapitalizePipe,
    SortCommentsByDatePipe,
    LimitToThreeOffersPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferPageComponent implements OnInit, OnDestroy {
  private notifier$ = new Subject<void>();
  private paramId = signal<string | null>(null);
  private offersService = inject(OffersService);
  private commentsService = inject(CommentService);
  private store = inject(Store<{ appStore: AppState }>);
  private router = inject(Router);
  private toggleFavoriteButtonNative: HTMLElement | null = null;
  private isFavorite = false;

  protected route = inject(ActivatedRoute);
  protected offer = signal<Offer | undefined>(undefined);
  protected user = signal<User | undefined>(undefined);
  protected authorizationStatus = signal<AuthorizationStatus>(
    AuthorizationStatus.Unknown
  );
  protected comments = signal<Comment[]>([]);
  protected nearbyOffers = signal<OfferPreview[]>([]);
  protected readonly AppRoute = AppRoute;

  constructor() {
    effect(() => {
      const id = this.paramId();
      if (id) {
        this.offersService
          .getOfferById(id)
          .pipe(takeUntil(this.notifier$))
          .subscribe(offer => {
            this.offer.set(offer);
          });
        this.commentsService
          .getComments(id)
          .pipe(takeUntil(this.notifier$))
          .subscribe(comments => this.comments.set(comments));
        this.offersService
          .getNearbyOffers(id)
          .pipe(takeUntil(this.notifier$))
          .subscribe(nearby => this.nearbyOffers.set(nearby));
      }
    });

    effect(() => {
      this.isFavorite = this.offer()?.isFavorite ?? false;
    });

    this.route.paramMap
      .pipe(takeUntil(this.notifier$))
      .subscribe(params => this.paramId.set(params.get('id')));
  }

  @ViewChild('toggleFavoriteButton') set toggleFavoriteButton(
    button: ElementRef | undefined
  ) {
    if (button) {
      this.toggleFavoriteButtonNative = button.nativeElement as HTMLElement;
    }
  }

  ngOnInit() {
    combineLatest([
      this.store.select(selectUser),
      this.store.select(selectAuthorizationStatus),
    ])
      .pipe(takeUntil(this.notifier$))
      .subscribe(([user, authStatus]) => {
        this.user.set(user);
        this.authorizationStatus.set(authStatus);
      });
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  toggleOfferFavorite(evt: MouseEvent) {
    const target = evt.currentTarget as HTMLButtonElement;
    if (this.authorizationStatus() === AuthorizationStatus.Auth) {
      target.disabled = true;
      this.toggleFavoriteButtonNative?.classList.toggle(
        'offer__bookmark-button--active'
      );
      this.store.dispatch(
        changeFavoriteStatus({
          id: this.offer()?.id,
          status: +!this.isFavorite,
        })
      );
      this.store
        .select(selectFavoriteOffersIsLoading)
        .pipe(
          filter(isLoading => isLoading === false),
          take(1),
          finalize(() => {
            target.disabled = false;
          })
        )
        .subscribe();
      this.isFavorite = !this.isFavorite;
    } else {
      this.router.navigate([AppRoute.Login]);
    }
  }

  protected addNewComment(comment: Comment) {
    this.comments.update(currentOffers => [comment, ...currentOffers]);
  }

  protected readonly Math = Math;
  protected readonly of = of;
  protected readonly AuthorizationStatus = AuthorizationStatus;
}
