import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appToggleSortOptions]',
})
export class ToggleSortOptionsDirective {
  @Output() toggleSortOptions = new EventEmitter<boolean>();

  private isOpen = signal<boolean>(false);

  @HostListener('click')
  onSortClick() {
    this.toggleOptions();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(evt: KeyboardEvent): void {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      this.toggleOptions();
    }
    if (evt.key === 'Escape' && this.isOpen() === true) this.toggleOptions();
  }

  private toggleOptions() {
    this.isOpen.set(!this.isOpen());
    this.toggleSortOptions.emit(this.isOpen());
  }
}
