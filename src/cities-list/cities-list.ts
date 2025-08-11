import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CITY_LOCATIONS} from '../const';
import {City} from '../types/city';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {changeCity} from '../store/app.actions';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.html'
})

export class CitiesListComponent {
  constructor(private store: Store<{ appStore: AppState }>) {
  }

  protected readonly CITY_LOCATIONS = CITY_LOCATIONS;

  @Input() currentCity!: City;

  @ViewChild('citiesList') citiesListComponent!: ElementRef;

  onClickCityButton(evt: MouseEvent) {
    const target = evt.target as HTMLElement;

    const ul = this.citiesListComponent.nativeElement as HTMLElement;
    Array.from(ul.children).forEach(listItem => {
      listItem.querySelector('.locations__item-link')?.classList.remove('tabs__item--active');
    })

    const newCurrentCity = CITY_LOCATIONS.find(city => city.name === target.textContent);

    if (newCurrentCity !== undefined) {
      this.store.dispatch(changeCity({city: newCurrentCity}))
    }
  }
}
