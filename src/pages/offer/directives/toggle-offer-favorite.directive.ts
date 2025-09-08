import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { AuthorizationStatus } from '../../../core/constants/const';

@Directive({
  selector: '[appToggleOfferFavorite]',
})
export class ToggleOfferFavoriteDirective {
  @Input({ required: true }) public authorizationStatus!: AuthorizationStatus;
  @Input({ required: true }) public isOfferPage = false;
  @Output() public offerFavoriteToggled = new EventEmitter();

  private toggleFavoriteButton = inject(ElementRef);

  @HostListener('click', ['$event'])
  toggleOfferFavorite(evt: MouseEvent): void {
    if (this.authorizationStatus === AuthorizationStatus.Auth) {
      evt.stopPropagation();
      const toggleFavoriteButtonNative = this.toggleFavoriteButton
        .nativeElement as HTMLButtonElement;
      if (this.isOfferPage) {
        toggleFavoriteButtonNative?.classList.toggle(
          'offer__bookmark-button--active'
        );
      } else {
        toggleFavoriteButtonNative?.classList.toggle(
          'place-card__bookmark-button--active'
        );
      }
    }
    this.offerFavoriteToggled.emit();
  }
}
