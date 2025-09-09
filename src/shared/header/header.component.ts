import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { AppRoute } from '../../app/app.routes';
import { Router, RouterLink } from '@angular/router';
import { AuthorizationStatus } from '../../core/constants/const';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { OfferPreview } from '../../core/models/offers';
import {
  selectAllFavoriteOffers,
  selectUser,
} from '../../store/app/app.selectors';
import { AppLogoutClickDirective } from './directives/logout-click.directive';
import { logout } from '../../store/user/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterLink, AppLogoutClickDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input({ required: true }) authorizationStatus!: AuthorizationStatus;

  private store = inject(Store<{ appStore: AppState }>);
  private route = inject(Router);
  private authService = inject(AuthService);
  private destroySubject = new Subject<void>();
  public user = signal<User | undefined>(undefined);
  public favoriteOffers = signal<OfferPreview[] | null>(null);
  public readonly AppRoute = AppRoute;
  public readonly AuthorizationStatus = AuthorizationStatus;

  public ngOnInit(): void {
    combineLatest([
      this.store.select(selectUser),
      this.store.select(selectAllFavoriteOffers),
    ])
      .pipe(takeUntil(this.destroySubject))
      .subscribe(
        ([user, favoriteOffers]: [User | undefined, OfferPreview[]]): void => {
          this.user.set(user);
          this.favoriteOffers.set(favoriteOffers);
        }
      );
  }

  public ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  public onLogout(): void {
    this.store.dispatch(logout());
    this.route.navigate([AppRoute.Login]);
    this.authService.removeToken();
  }
}
