import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AppRoute} from '../app/app.routes';
import {RouterLink} from '@angular/router';
import {AuthorizationStatus} from '../const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent {
  @Input() authorizationStatus!: AuthorizationStatus;

  protected readonly AppRoute = AppRoute;
  protected readonly AuthorizationStatus = AuthorizationStatus;
}
