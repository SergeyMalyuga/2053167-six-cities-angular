import {Pipe, PipeTransform} from '@angular/core';
import {City} from '../../core/models/city';

@Pipe({
  name: 'randomCity'
})

export class RandomCityPipe implements PipeTransform {

  transform(cities: City[]): string {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex].name;
  }
}
