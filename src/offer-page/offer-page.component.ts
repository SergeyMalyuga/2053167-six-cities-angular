import {ChangeDetectionStrategy, Component, effect, inject, Input, OnDestroy, OnInit, signal} from '@angular/core';
import {CommentFormComponent} from '../comment-form/comment-form.component';
import {comments} from '../mocks/comments';
import {Comment} from '../types/comments';
import {CommentListComponent} from '../comment-list/comment-list.component';
import {MapComponent} from '../map/map.component';
import {neighborOffers} from '../mocks/neghbor-offers';
import {OffersListNearbyComponent} from '../offers-list-nearby/offers-list-nearby.component';
import {AppRoute} from '../app/app.routes';
import {HeaderComponent} from '../header/header.component';
import {ActivatedRoute} from '@angular/router';
import {OffersService} from '../sirvices/offer.service';
import {Offer} from '../types/offers';
import {of, Subject, takeUntil, combineLatest} from 'rxjs';
import {LoaderComponent} from '../loader/loader.component';
import {CapitalizePipe} from '../card/capitalize.pipe';
import {User} from '../types/user';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {selectAuthorizationStatus, selectUser} from '../store/app.selectors';
import {AuthorizationStatus} from '../const';
import {CommentService} from '../sirvices/comment.service';
import {SortCommentsByDatePipe} from './pipe/sort-comments-by-date.pipe';

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  imports: [CommentFormComponent, CommentListComponent, MapComponent, OffersListNearbyComponent, HeaderComponent, LoaderComponent, CapitalizePipe, SortCommentsByDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OfferPageComponent implements OnInit, OnDestroy {
  @Input() neighborOffers = neighborOffers;

  private notifier$ = new Subject<void>();
  private paramId = signal<string | null>(null);
  private offersService = inject(OffersService);
  private commentsService = inject(CommentService);
  private store = inject(Store<{ appStore: AppState }>);

  protected route = inject(ActivatedRoute);
  protected offer = signal<Offer | undefined>(undefined);
  protected user = signal<User | undefined>(undefined);
  protected authorizationStatus = signal<AuthorizationStatus>(AuthorizationStatus.Unknown);
  protected comments = signal<Comment[]>([]);
  protected readonly AppRoute = AppRoute;

  constructor() {
    effect(() => {
      const id = this.paramId();
      if (id) {
        this.offersService.getOfferById(id).pipe(takeUntil(this.notifier$)).subscribe(offer => {
          this.offer.set(offer)
        });
        this.commentsService.getComments(id).pipe(takeUntil(this.notifier$)).subscribe((comments) => this.comments.set(comments));
      }
    });

    this.route.paramMap.pipe(takeUntil(this.notifier$)).subscribe(params => this.paramId.set(params.get('id')));
  }

  ngOnInit() {
    combineLatest([this.store.select(selectUser), this.store.select(selectAuthorizationStatus)]).pipe(takeUntil(this.notifier$))
      .subscribe(([user, authStatus]) => {
        this.user.set(user);
        this.authorizationStatus.set(authStatus)
      })
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  protected addNewComment(comment: Comment) {
    this.comments.update((currentOffers) => [comment, ...currentOffers])
  }

  protected readonly Math = Math;
  protected readonly of = of;
  protected readonly AuthorizationStatus = AuthorizationStatus;
}
