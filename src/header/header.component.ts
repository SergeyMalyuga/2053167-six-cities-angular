import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {AppRoute} from '../app/app.routes';
import {Router, RouterLink} from '@angular/router';
import {AuthorizationStatus} from '../const';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {logout} from '../store/app.actions';
import {AuthService} from '../sirvices/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements AfterViewInit {

  private store = inject(Store<{ appStore: AppState }>)
  private route = inject(Router);
  private authService = inject(AuthService);
  private authToggleElementNative: HTMLElement | null = null;

  ngAfterViewInit(): void {
    this.authToggleElementNative = this.authToggleElement?.nativeElement;
  }

  @Input() authorizationStatus!: AuthorizationStatus;

  protected readonly AppRoute = AppRoute;
  protected readonly AuthorizationStatus = AuthorizationStatus;

  @ViewChild('authToggleElement') authToggleElement!: ElementRef;
  @ViewChild('authNavLink') authNavLink!: ElementRef;


  logout(evt: MouseEvent) {
    this.handleLogout(evt);
  }

  onKeyDown(evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
      this.authToggleElementNative?.blur();
    }
    this.handleLogout(evt)
  }

  private handleLogout(evt: MouseEvent | KeyboardEvent) {
    const target = evt.target as HTMLElement;
    if (target.textContent === 'Log out') {
      this.store.dispatch(logout());
      this.route.navigate([AppRoute.Main])
      this.authService.removeToken();
    }
  }
}
