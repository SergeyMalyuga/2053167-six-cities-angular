import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppRoute} from '../app/app.routes';

@Component({
  selector: 'app-not-found-page',
  styleUrls: ['./not-found.component.css'],
  templateUrl: './not-found.component.html',
  imports: [RouterModule]
})

export class NotFoundComponent {

  protected readonly AppRoute = AppRoute;
}
