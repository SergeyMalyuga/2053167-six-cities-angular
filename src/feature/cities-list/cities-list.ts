import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CITY_LOCATIONS, SORT_TYPE} from '../../core/constants/const';
import {City} from '../../core/models/city';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app-state';
import {changeCity} from '../../store/app/app.actions';
import {CityClickDirective} from './city-click.directive';

@Component({
  selector: 'app-cities-list',
  imports: [
    CityClickDirective
  ],
  templateUrl: './cities-list.html'
})

export class CitiesListComponent {
  constructor(private store: Store<{ appStore: AppState }>) {
  }

  protected readonly CITY_LOCATIONS = CITY_LOCATIONS;

  @Input() currentCity!: City;
  @Output() changeSortType = new EventEmitter<SORT_TYPE>();
  @ViewChild('citiesList') citiesListComponent!: ElementRef;

  protected onCItyClicked(newCurrentCity: City | undefined) {
    this.changeSortType.emit(SORT_TYPE.POPULAR);
    if (newCurrentCity !== undefined) {
      this.store.dispatch(changeCity({city: newCurrentCity}))
    }
  }
}
