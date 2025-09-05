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
  @Output() offerFavoriteToggled = new EventEmitter();

  private toggleFavoriteButton = inject(ElementRef);

  @HostListener('click', ['$event'])
  toggleOfferFavorite(): void {
    const toggleFavoriteButtonNative = this.toggleFavoriteButton
      .nativeElement as HTMLButtonElement;
    console.log(1);
    if (this.authorizationStatus === AuthorizationStatus.Auth) {
      console.log(2);
      toggleFavoriteButtonNative?.classList.toggle(
        'offer__bookmark-button--active'
      );
    }
    this.offerFavoriteToggled.emit();
  }
}
/*      this.store.dispatch(
        changeFavoriteStatus({
          id: this.offer()?.id,
          status: +!this.isFavorite,
        })
      );
      this.store
        .select(selectFavoriteOffersIsLoading)
        .pipe(
          filter(isLoading => isLoading === false),
          take(1),
          finalize(() => {
            target.disabled = false;
          })
        )
        .subscribe();
      this.isFavorite = !this.isFavorite;
      else {
      this.router.navigate([AppRoute.Login]);
    }
      */
