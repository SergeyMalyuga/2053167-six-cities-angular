import {Component} from '@angular/core';
import {AppRoute} from '../app/app.routes';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    RouterLink
  ]
})

export class HeaderComponent {
  protected readonly AppRoute = AppRoute;
}
