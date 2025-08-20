import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input, OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {OfferPreview} from '../types/offers';
import {CapitalizePipe} from './capitalize.pipe';
import {RouterModule} from '@angular/router';
import {AppRoute} from '../app/app.routes';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {changeFavoriteStatus} from '../store/app.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [CapitalizePipe, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
    this.isFavorite = this.offer ? this.offer.isFavorite : false;
  }

  protected readonly Math = Math;
  protected readonly AppRoute = AppRoute;
  private isFavorite = false;

  @Input() offer: OfferPreview | undefined = undefined;
  @Input() isFavoritePage = false;
  @Input() isOfferPage = false;

  @Output() cardMouseEnter = new EventEmitter<OfferPreview>();
  @Output() cardMouseLeave = new EventEmitter<void>();

  @ViewChild('favoriteButton') favoriteButton!: ElementRef;

  private store = inject(Store<{ appStore: AppState }>);
  private favoriteButtonNative: HTMLElement | null = null;

  ngAfterViewInit(): void {
    this.favoriteButtonNative = this.favoriteButton.nativeElement as HTMLElement;
  }


  onMouseEnter() {
    this.cardMouseEnter.emit(this.offer);
  }

  onMouseLeave = () => {
    this.cardMouseLeave.emit();
  }

  toggleOfferFavorite() {
    this.favoriteButtonNative?.classList.toggle('place-card__bookmark-button--active');
    this.store.dispatch(changeFavoriteStatus({
      id: this.offer?.id,
      status: +!this.isFavorite
    }));
    this.isFavorite = !this.isFavorite;
  }
}



