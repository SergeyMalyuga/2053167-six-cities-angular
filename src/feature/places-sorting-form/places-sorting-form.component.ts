import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
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
  @Input({ required: true }) public city!: City;
  @Output() public sortTypeChanged: EventEmitter<SORT_TYPE> =
    new EventEmitter<SORT_TYPE>();

  private destroySubject: Subject<void> = new Subject<void>();
  public readonly SORT_TYPE: typeof SORT_TYPE = SORT_TYPE;
  public isSortOptionsOpen: WritableSignal<boolean> = signal<boolean>(false);
  public sortType: WritableSignal<SORT_TYPE> = signal<SORT_TYPE>(
    SORT_TYPE.POPULAR
  );

  public ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  public onSortOptionsToggled(isOpen: boolean): void {
    this.isSortOptionsOpen.set(isOpen);
  }

  public handleSortTypeChanged(sortType: SORT_TYPE): void {
    this.sortType.set(sortType);
    this.sortTypeChanged.emit(sortType);
  }
}
