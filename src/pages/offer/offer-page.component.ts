import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommentFormComponent } from '../../feature/comment-form/comment-form.component';
import { Comment } from '../../core/models/comments';
import { CommentListComponent } from '../../feature/comment-list/comment-list.component';
import { MapComponent } from '../../shared/map/map.component';
import { OffersListNearbyComponent } from '../../feature/offers-list-nearby/offers-list-nearby.component';
import { AppRoute } from '../../app/app.routes';
import { HeaderComponent } from '../../shared/header/header.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OffersService } from '../../core/services/offer.service';
import { Offer, OfferPreview } from '../../core/models/offers';
import {
  combineLatest,
  filter,
  finalize,
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
import { LimitToThreeOffersPipe } from '../../feature/offers-list-nearby/limit-to-three-offers.pipe';
import { ToggleOfferFavoriteDirective } from './directives/toggle-offer-favorite.directive';
import { changeFavoriteStatus } from '../../store/favorite-offer/actions/favorite-offer.actions';

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
  private destroySubject: Subject<void> = new Subject<void>();
  private paramId: WritableSignal<string | null> = signal<string | null>(null);
  private offersService: OffersService = inject(OffersService);
  private commentsService: CommentService = inject(CommentService);
  private store: Store<AppState> = inject(Store<AppState>);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  public isFavorite = false;
  public offer: WritableSignal<Offer | undefined> = signal<Offer | undefined>(
    undefined
  );
  public user: WritableSignal<User | undefined> = signal<User | undefined>(
    undefined
  );
  public authorizationStatus: WritableSignal<AuthorizationStatus> =
    signal<AuthorizationStatus>(AuthorizationStatus.Unknown);
  public comments: WritableSignal<Comment[]> = signal<Comment[]>([]);
  public nearbyOffers: WritableSignal<OfferPreview[]> = signal<OfferPreview[]>(
    []
  );
  public isFavoriteButtonDisabled: WritableSignal<boolean> =
    signal<boolean>(false);
  public readonly Math: Math = Math;
  public readonly AuthorizationStatus: typeof AuthorizationStatus =
    AuthorizationStatus;

  constructor() {
    effect((): void => {
      const id: string | null = this.paramId();
      if (id) {
        this.offersService
          .getOfferById(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((offer: Offer): void => {
            this.offer.set(offer);
          });
        this.commentsService
          .getComments(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((comments: Comment[]): void =>
            this.comments.set(comments)
          );
        this.offersService
          .getNearbyOffers(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((nearby: OfferPreview[]): void =>
            this.nearbyOffers.set(nearby)
          );
      }
    });

    effect((): void => {
      this.isFavorite = this.offer()?.isFavorite ?? false;
    });

    this.route.paramMap
      .pipe(takeUntil(this.destroySubject))
      .subscribe((params: ParamMap) => this.paramId.set(params.get('id')));
  }

  public ngOnInit(): void {
    combineLatest([
      this.store.select(selectUser),
      this.store.select(selectAuthorizationStatus),
    ])
      .pipe(takeUntil(this.destroySubject))
      .subscribe(
        ([user, authStatus]: [User | undefined, AuthorizationStatus]): void => {
          this.user.set(user);
          this.authorizationStatus.set(authStatus);
        }
      );
  }

  public ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  public handleOfferFavoriteToggled(): void {
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
          filter((isLoading: boolean): boolean => isLoading === false),
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

  public addNewComment(comment: Comment): void {
    this.comments.update((currentOffers: Comment[]): Comment[] => [
      comment,
      ...currentOffers,
    ]);
  }
}
