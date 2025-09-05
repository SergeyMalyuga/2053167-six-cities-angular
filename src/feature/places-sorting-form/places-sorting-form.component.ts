import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  signal,
} from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { Subject } from 'rxjs';
import { SORT_TYPE } from '../../core/constants/const';
import { ToggleSortOptionsDirective } from './directives/toggle-sort-options.directive';
import { CloseSortOptionsDirective } from './directives/close-sort-options.directive';
import { SetSortPlacesOptionsDirective } from './directives/set-sort-places-options.directive';
import { City } from '../../core/models/city';

@Component({
  selector: 'app-places-sorting-form',
  templateUrl: './places-sorting-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ToggleSortOptionsDirective,
    CloseSortOptionsDirective,
    SetSortPlacesOptionsDirective,
  ],
})
export class PlacesSortingFormComponent implements OnDestroy {
  @Input({ required: true }) city!: City;
  @Output() public sortTypeChanged = new EventEmitter<SORT_TYPE>();

  private destroy$ = new Subject<void>();
  public readonly SORT_TYPE = SORT_TYPE;
  public isSortOptionsOpen = signal<boolean>(false);
  public sortType = signal<SORT_TYPE>(SORT_TYPE.POPULAR);

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSortOptionsToggled(isOpen: boolean): void {
    this.isSortOptionsOpen.set(isOpen);
  }

  public onSortTypeChanged(sortType: SORT_TYPE): void {
    this.sortTypeChanged.emit(sortType);
  }
}
