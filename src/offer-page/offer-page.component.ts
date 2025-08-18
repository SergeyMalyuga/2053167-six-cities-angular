import {ChangeDetectionStrategy, Component, effect, inject, Input, OnDestroy, signal} from '@angular/core';
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
import {Subject, takeUntil} from 'rxjs';
import {LoaderComponent} from '../loader/loader.component';
import {CapitalizePipe} from '../card/capitalize.pipe';

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  imports: [CommentFormComponent, CommentListComponent, MapComponent, OffersListNearbyComponent, HeaderComponent, LoaderComponent, CapitalizePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OfferPageComponent implements OnDestroy {
  @Input() comments = signal<Comment[]>(comments)
  @Input() neighborOffers = neighborOffers;

  private notifier$ = new Subject<void>();
  protected route = inject(ActivatedRoute);
  private offersService = inject(OffersService);
  protected offer = signal<Offer | undefined>(undefined);
  private paramId = signal<string | null>(null);
  protected iaLoading = signal<boolean>(false);
  protected readonly AppRoute = AppRoute;

  constructor() {
    effect(() => {
      const id = this.paramId();
      if (id) {
        this.offersService.getOfferById(id).pipe(takeUntil(this.notifier$)).subscribe(offer => {
          this.offer.set(offer)
        });
      }
    });

    this.route.paramMap.pipe(takeUntil(this.notifier$)).subscribe(params => this.paramId.set(params.get('id')));
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  protected readonly Math = Math;
}
