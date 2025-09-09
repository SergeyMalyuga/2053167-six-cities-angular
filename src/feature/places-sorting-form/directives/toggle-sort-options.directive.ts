import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';

@Directive({
  selector: '[appToggleSortOptions]',
})
export class ToggleSortOptionsDirective {
  @Output() toggleSortOptions: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  private isOpen: WritableSignal<boolean> = signal<boolean>(false);

  @HostListener('click')
  onSortClick(): void {
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

  private toggleOptions(): void {
    this.isOpen.set(!this.isOpen());
    this.toggleSortOptions.emit(this.isOpen());
  }
}
