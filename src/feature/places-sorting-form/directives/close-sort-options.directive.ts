import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appCloseSortOptions]',
})
export class CloseSortOptionsDirective {
  private elementRef = inject(ElementRef);

  private toggleSortOptions(force?: boolean) {
    this.elementRef.nativeElement.classList.toggle(
      'places__options--opened',
      force
    );
  }

  @HostListener('mouseleave')
  onOptionsLeave() {
    this.toggleSortOptions(false);
  }
}
