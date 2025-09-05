import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { AppRoute } from '../../app/app.routes';
import { Router, RouterLink } from '@angular/router';
import { AuthorizationStatus } from '../../core/constants/const';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { loadFavoriteOffersData, logout } from '../../store/app/app.actions';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { OfferPreview } from '../../core/models/offers';
import {
  selectAllFavoriteOffers,
  selectUser,
} from '../../store/app/app.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() authorizationStatus!: AuthorizationStatus;
  @ViewChild('authToggleElement') authToggleElement!: ElementRef;
  @ViewChild('authNavLink') authNavLink!: ElementRef;

  private store = inject(Store<{ appStore: AppState }>);
  private route = inject(Router);
  private authService = inject(AuthService);
  private authToggleElementNative: HTMLElement | null = null;
  private notifier$ = new Subject<void>();
  public user = signal<User | undefined>(undefined);
  public favoriteOffers = signal<OfferPreview[] | null>(null);
  public readonly AppRoute = AppRoute;
  public readonly AuthorizationStatus = AuthorizationStatus;

  ngAfterViewInit(): void {
    this.authToggleElementNative = this.authToggleElement?.nativeElement;
  }

  ngOnInit(): void {
    combineLatest([
      this.store.select(selectUser),
      this.store.select(selectAllFavoriteOffers),
    ])
      .pipe(takeUntil(this.notifier$))
      .subscribe(([user, favoriteOffers]) => {
        this.user.set(user);
        this.favoriteOffers.set(favoriteOffers);
      });
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  logout(evt: MouseEvent) {
    this.handleLogout(evt);
  }

  onKeyDown(evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
      this.authToggleElementNative?.blur();
    } else if (evt.key === 'Enter' || evt.key === ' ') {
      this.handleLogout(evt);
    }
  }

  private handleLogout(evt: MouseEvent | KeyboardEvent) {
    const target = evt.target as HTMLElement;
    if (target.textContent === 'Log out') {
      this.store.dispatch(logout());
      this.route.navigate([AppRoute.Main]);
      this.authService.removeToken();
    }
  }

  navigateToFavorites(evt: MouseEvent): void {
    evt.preventDefault();
    this.route.navigate([AppRoute.Favorites]);
  }
}
