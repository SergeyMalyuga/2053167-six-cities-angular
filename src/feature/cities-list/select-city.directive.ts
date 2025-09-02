import {Directive, ElementRef, EventEmitter, HostListener, inject, Output, Renderer2} from '@angular/core';
import {City} from '../../core/models/city';
import {CITY_LOCATIONS} from '../../core/constants/const';

@Directive({
  selector: '[appSelectCity]',
})

export class SelectCityDirective {

  @Output() clickedCity = new EventEmitter<City | undefined>();

  private elementRef = inject(ElementRef);
  private render = inject(Renderer2);

  @HostListener('click', ['$event'])
  onClickCityButton(evt: MouseEvent) {
    const target = evt.currentTarget as HTMLElement;

    const ul = this.elementRef.nativeElement.closest('ul') as HTMLElement;

    Array.from(ul.children).forEach(listItem => {
      this.render.removeClass(listItem.querySelector('.locations__item-link'), 'tabs__item--active')
    })

    const newCurrentCity = CITY_LOCATIONS.find(city => city.name === target.dataset["city"]);
    this.clickedCity.emit(newCurrentCity);
  }
}
