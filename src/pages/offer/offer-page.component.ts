import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
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
import { ToggleOfferFavoriteDirective } from './directives/toggle-offer-favorite.directive';

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
    ToggleOfferFavoriteDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferPageComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject<void>();
  private paramId = signal<string | null>(null);
  private offersService = inject(OffersService);
  private commentsService = inject(CommentService);
  private store = inject(Store<{ appStore: AppState }>);
  private router = inject(Router);

  public isFavorite = false;
  public route = inject(ActivatedRoute);
  public offer = signal<Offer | undefined>(undefined);
  public user = signal<User | undefined>(undefined);
  public authorizationStatus = signal<AuthorizationStatus>(
    AuthorizationStatus.Unknown
  );
  public comments = signal<Comment[]>([]);
  public nearbyOffers = signal<OfferPreview[]>([]);
  public isFavoriteButtonDisabled = signal<boolean>(false);
  public readonly AppRoute = AppRoute;

  constructor() {
    effect(() => {
      const id = this.paramId();
      if (id) {
        this.offersService
          .getOfferById(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe(offer => {
            this.offer.set(offer);
          });
        this.commentsService
          .getComments(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe(comments => this.comments.set(comments));
        this.offersService
          .getNearbyOffers(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe(nearby => this.nearbyOffers.set(nearby));
      }
    });

    effect(() => {
      this.isFavorite = this.offer()?.isFavorite ?? false;
    });

    this.route.paramMap
      .pipe(takeUntil(this.destroySubject))
      .subscribe(params => this.paramId.set(params.get('id')));
  }

  ngOnInit() {
    combineLatest([
      this.store.select(selectUser),
      this.store.select(selectAuthorizationStatus),
    ])
      .pipe(takeUntil(this.destroySubject))
      .subscribe(([user, authStatus]) => {
        this.user.set(user);
        this.authorizationStatus.set(authStatus);
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  handleOfferFavoriteToggled() {
    if (this.authorizationStatus() === AuthorizationStatus.Auth) {
      this.isFavoriteButtonDisabled.set(true);
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
            this.isFavoriteButtonDisabled.set(false);
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
