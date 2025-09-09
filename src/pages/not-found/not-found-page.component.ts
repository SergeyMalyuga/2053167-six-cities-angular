import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoute } from '../../app/app.routes';

@Component({
  selector: 'app-not-found',
  styleUrls: ['./not-found-page.component.css'],
  templateUrl: './not-found-page.component.html',
  imports: [RouterModule],
})
export class NotFoundPageComponent {
  public readonly AppRoute: typeof AppRoute = AppRoute;
}
