import {Component, Input, signal} from '@angular/core';
import {OfferPreview} from '../types/offers';
import {CapitalizePipe} from './capitalize.pipe';
import {RouterModule} from '@angular/router';
import {AppRoute} from '../app/app.routes';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [CapitalizePipe, RouterModule],
})

export class CardComponent {
  protected readonly Math = Math;
  protected readonly AppRoute = AppRoute;
  @Input() offer: OfferPreview | undefined = undefined;
  @Input() isFavoritePage = false;
  isActive = signal(false);

  onMouseEnter = () => {
    this.isActive.set(true);
  }
  onMouseLeave = () => {
    this.isActive.set(false);
  }
}



