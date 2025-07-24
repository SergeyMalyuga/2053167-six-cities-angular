import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal} from '@angular/core';
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
  isActive = signal(false);

  @Output() cardMouseEnter = new EventEmitter<OfferPreview>();
  @Output() cardMouseLeave = new EventEmitter<void>();

  onMouseEnter() {
    this.cardMouseEnter.emit(this.offer);
  }
  onMouseLeave = () => {
   this.cardMouseLeave.emit();
  }
}



