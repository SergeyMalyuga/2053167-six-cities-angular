import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MainPageComponent} from '../main-page/main-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  countOffers = signal(5);
}
