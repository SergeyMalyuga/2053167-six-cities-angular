import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CITY_LOCATIONS, SORT_TYPE} from '../../core/constants/const';
import {City} from '../../core/models/city';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app-state';
import {changeCity} from '../../store/app/app.actions';
import {SelectCityDirective} from './directives/select-city.directive';

@Component({
  selector: 'app-cities-list',
  imports: [
    SelectCityDirective
  ],
  templateUrl: './cities-list.html'
})

export class CitiesListComponent {
  constructor(private store: Store<{ appStore: AppState }>) {
  }

  public readonly CITY_LOCATIONS = CITY_LOCATIONS;

  @Input({required: true}) currentCity!: City;
  @Output() changeSortType = new EventEmitter<SORT_TYPE>();

  public selectCity(selectedCity: City | undefined) {
    this.changeSortType.emit(SORT_TYPE.POPULAR);
    if (selectedCity !== undefined) {
      this.store.dispatch(changeCity({city: selectedCity}))
    }
  }
}
