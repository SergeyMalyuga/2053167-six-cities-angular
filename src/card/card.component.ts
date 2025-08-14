import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewChild
} from '@angular/core';
import {OfferPreview} from '../types/offers';
import {CapitalizePipe} from './capitalize.pipe';
import {RouterModule} from '@angular/router';
import {AppRoute} from '../app/app.routes';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [CapitalizePipe, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardComponent {

  protected readonly Math = Math;
  protected readonly AppRoute = AppRoute;

  @Input() offer: OfferPreview | undefined = undefined;
  @Input() isFavoritePage = false;
  @Input() isOfferPage = false;

  @Output() cardMouseEnter = new EventEmitter<OfferPreview>();
  @Output() cardMouseLeave = new EventEmitter<void>();

  @ViewChild('favoriteButton') favoriteButton!: ElementRef;

  onMouseEnter() {
    this.cardMouseEnter.emit(this.offer);
  }

  onMouseLeave = () => {
    this.cardMouseLeave.emit();
  }

  toggleOfferFavorite() {
    const target = this.favoriteButton.nativeElement as HTMLElement
    target.classList.toggle('place-card__bookmark-button--active');
  }
}



