import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CITY_LOCATIONS, SORT_TYPE } from '../../core/constants/const';
import { City } from '../../core/models/city';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { changeCity } from '../../store/city/actions/city.actions';

@Component({
  selector: 'app-cities-list',
  imports: [],
  templateUrl: './cities-list.html',
})
export class CitiesListComponent {
  constructor(private store: Store<{ appStore: AppState }>) {}

  public readonly CITY_LOCATIONS = CITY_LOCATIONS;

  @Input({ required: true }) public currentCity!: City;
  @Output() public SortTypeChanged = new EventEmitter<SORT_TYPE>();

  public selectCity(city: City) {
    this.SortTypeChanged.emit(SORT_TYPE.POPULAR);
    this.store.dispatch(changeCity({ city }));
  }
}
