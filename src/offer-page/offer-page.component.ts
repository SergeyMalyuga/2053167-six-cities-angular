import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
import {CommentFormComponent} from '../comment-form/comment-form.component';
import {Comment} from '../types/comments';
import {CommentListComponent} from '../comment-list/comment-list.component';
import {MapComponent} from '../map/map.component';
import {neighborOffers} from '../mocks/neghbor-offers';
import {OffersListNearbyComponent} from '../offers-list-nearby/offers-list-nearby.component';
import {AppRoute} from '../app/app.routes';
import {HeaderComponent} from '../header/header.component';
import {ActivatedRoute, Router} from '@angular/router';
import {OffersService} from '../sirvices/offer.service';
import {Offer, OfferPreview} from '../types/offers';
import {combineLatest, of, Subject, takeUntil} from 'rxjs';
import {LoaderComponent} from '../loader/loader.component';
import {CapitalizePipe} from '../card/capitalize.pipe';
import {User} from '../types/user';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {selectAuthorizationStatus, selectUser} from '../store/app.selectors';
import {AuthorizationStatus} from '../const';
import {CommentService} from '../sirvices/comment.service';
import {SortCommentsByDatePipe} from './pipe/sort-comments-by-date.pipe';
import {changeFavoriteStatus} from '../store/app.actions';
import {LimitToThreeOffersPipe} from '../offers-list-nearby/limit-to-three-offers.pipe';


@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  imports: [CommentFormComponent, CommentListComponent, MapComponent, OffersListNearbyComponent, HeaderComponent, LoaderComponent, CapitalizePipe, SortCommentsByDatePipe, LimitToThreeOffersPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OfferPageComponent implements OnInit, OnDestroy {

  private notifier$ = new Subject<void>();
  private paramId = signal<string | null>(null);
  private offersService = inject(OffersService);
  private commentsService = inject(CommentService);
  private store = inject(Store<{ appStore: AppState }>);
  private router = inject(Router);
  private toggleFavoriteButtonNative: HTMLElement | null = null;

  protected route = inject(ActivatedRoute);
  protected offer = signal<Offer | undefined>(undefined);
  protected user = signal<User | undefined>(undefined);
  protected authorizationStatus = signal<AuthorizationStatus>(AuthorizationStatus.Unknown);
  protected comments = signal<Comment[]>([]);
  protected nearbyOffers = signal<OfferPreview[]>([]);
  protected readonly AppRoute = AppRoute;

  constructor() {
    effect(() => {
      const id = this.paramId();
      if (id) {
        this.offersService.getOfferById(id).pipe(takeUntil(this.notifier$)).subscribe(offer => {
          this.offer.set(offer)
        });
        this.commentsService.getComments(id).pipe(takeUntil(this.notifier$)).subscribe((comments) => this.comments.set(comments));
      this.offersService.getNearbyOffers(id).pipe(takeUntil(this.notifier$)).subscribe((nearby) => this.nearbyOffers.set(nearby))
      }
    });



    this.route.paramMap.pipe(takeUntil(this.notifier$)).subscribe(params => this.paramId.set(params.get('id')));
  }

  @ViewChild('toggleFavoriteButton') set toggleFavoriteButton(button: ElementRef | undefined) {
    if (button) {
      this.toggleFavoriteButtonNative = button.nativeElement as HTMLElement;
      // Можно сразу добавить обработчики или выполнить действия
    }
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

  toggleOfferFavorite() {
    if(this.authorizationStatus() === AuthorizationStatus.Auth) {
      this.toggleFavoriteButtonNative?.classList.toggle('offer__bookmark-button--active');
      this.store.dispatch(changeFavoriteStatus({
        id: this.offer()?.id,
        status: +!this.offer()?.isFavorite
      }));
    } else {
      this.router.navigate([AppRoute.Login]);
    }

  }

  protected addNewComment(comment: Comment) {
    this.comments.update((currentOffers) => [comment, ...currentOffers])
  }

  protected readonly Math = Math;
  protected readonly of = of;
  protected readonly AuthorizationStatus = AuthorizationStatus;
}
