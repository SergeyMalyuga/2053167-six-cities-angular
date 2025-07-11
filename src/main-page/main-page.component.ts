import {Component, signal} from '@angular/core';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  imports: [CardComponent]
})

export class MainPageComponent {
  countOffers = signal(5);
}
