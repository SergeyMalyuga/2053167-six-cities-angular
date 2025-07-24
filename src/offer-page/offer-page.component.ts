import {ChangeDetectionStrategy, Component, Input, signal} from '@angular/core';
import {CommentFormComponent} from '../comment-form/comment-form.component';
import {comments} from '../mocks/comments';
import {Comment} from '../types/comments';
import {CommentListComponent} from '../comment-list/comment-list.component';
import {MapComponent} from '../map/map.component';
import {neighborOffers} from '../mocks/neghbor-offers';
import {OffersListNearbyComponent} from '../offers-list-nearby/offers-list-nearby.component';
import {AppRoute} from '../app/app.routes';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  imports: [CommentFormComponent, CommentListComponent, MapComponent, OffersListNearbyComponent, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OfferPageComponent {
  @Input() comments = signal<Comment[]>(comments)
  @Input() neighborOffers = neighborOffers;
  protected readonly AppRoute = AppRoute;
}
