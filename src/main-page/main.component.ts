import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main.component.html',
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainComponent {
  countOffers = signal(5);
}
