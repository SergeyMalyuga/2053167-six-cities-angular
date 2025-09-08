import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appLogoutClick]',
})
export class AppLogoutClickDirective {
  @Output() public logout: EventEmitter<Event> = new EventEmitter<Event>();

  @HostListener('click', ['$event'])
  public handleLogoutClick(evt: MouseEvent): void {
    this.handleLogout(evt);
  }

  @HostListener('keydown', ['$event'])
  public handleLogoutKeyDown(evt: KeyboardEvent): void {
    const target = evt.target as HTMLElement;
    if (evt.key === 'Escape') {
      evt.preventDefault();
      target?.blur();
    } else if (evt.key === 'Enter' || evt.key === ' ') {
      this.handleLogout(evt);
    }
  }

  private handleLogout(evt: MouseEvent | KeyboardEvent): void {
    const target = evt.target as HTMLElement;
    if (target.dataset['logout'] === 'true') {
      evt.preventDefault();
      evt.stopPropagation();
      this.logout.emit(evt);
    }
  }
}
