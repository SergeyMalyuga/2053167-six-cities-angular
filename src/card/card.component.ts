import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input, OnDestroy,
  OnInit,
  Output, signal,
  ViewChild
} from '@angular/core';
import {OfferPreview} from '../types/offers';
import {CapitalizePipe} from './capitalize.pipe';
import {Router, RouterModule} from '@angular/router';
import {AppRoute} from '../app/app.routes';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {changeFavoriteStatus} from '../store/app.actions';
import {AuthorizationStatus} from '../const';
import {selectAuthorizationStatus} from '../store/app.selectors';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [CapitalizePipe, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardComponent implements OnInit, OnDestroy, AfterViewInit {

  private store = inject(Store<{ appStore: AppState }>);
  private notifier$ = new Subject<void>();
  private router = inject(Router);
  private isFavorite = false;

  protected authorizationStatus = signal<AuthorizationStatus>(AuthorizationStatus.NoAuth);
  protected readonly Math = Math;
  protected readonly AppRoute = AppRoute;


  @Input() offer: OfferPreview | undefined = undefined;
  @Input() isFavoritePage = false;
  @Input() isOfferPage = false;

  @Output() cardMouseEnter = new EventEmitter<OfferPreview>();
  @Output() cardMouseLeave = new EventEmitter<void>();

  @ViewChild('favoriteButton') favoriteButton!: ElementRef;

  private favoriteButtonNative: HTMLElement | null = null;

  ngOnInit(): void {
    this.isFavorite = this.offer ? this.offer.isFavorite : false;
    this.store.select(selectAuthorizationStatus).pipe(takeUntil(this.notifier$)).subscribe(auth => this.authorizationStatus.set(auth));
  }

  ngAfterViewInit(): void {
    this.favoriteButtonNative = this.favoriteButton.nativeElement as HTMLElement;
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  onMouseEnter() {
    this.cardMouseEnter.emit(this.offer);
  }

  onMouseLeave = () => {
    this.cardMouseLeave.emit();
  }

  toggleOfferFavorite() {
    if(this.authorizationStatus() === AuthorizationStatus.Auth) {
      this.favoriteButtonNative?.classList.toggle('place-card__bookmark-button--active');
      this.store.dispatch(changeFavoriteStatus({
        id: this.offer?.id,
        status: +!this.isFavorite
      }));
      this.isFavorite = !this.isFavorite;
    } else {
      this.router.navigate([AppRoute.Login]);
    }

  }

  protected readonly AuthorizationStatus = AuthorizationStatus;
}



