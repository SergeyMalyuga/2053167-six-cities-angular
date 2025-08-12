import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-places-sorting-form',
  templateUrl: './places-sorting-form.component.html',
})

export class PlacesSortingFormComponent {

  @ViewChild('sortOptionsList') sortOptionsList!: ElementRef;

  private toggleSortOptions(force?: boolean) {
    this.sortOptionsList.nativeElement.classList.toggle(
      'places__options--opened',
      force
    );
  }

  onClickPlacesSorting() {
    this.toggleSortOptions();
  }

  onSortOptionsListMouseLeave() {
    this.toggleSortOptions(false);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') this.toggleSortOptions();
    if (event.key === 'Escape') this.toggleSortOptions(false);
  }
}
