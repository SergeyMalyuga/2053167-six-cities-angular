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
  ViewChild
} from '@angular/core';
import {AppRoute} from '../app/app.routes';
import {Router, RouterLink} from '@angular/router';
import {AuthorizationStatus} from '../const';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {logout} from '../store/app.actions';
import {AuthService} from '../sirvices/auth.service';
import {User} from '../types/user';
import {combineLatest, Subject, takeUntil} from 'rxjs';
import {Offer, OfferPreview} from '../types/offers';
import {selectAllFavoriteOffers, selectUser} from '../store/app.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  ngOnInit(): void {
    combineLatest([this.store.select(selectUser), this.store.select(selectAllFavoriteOffers)]).pipe(takeUntil(this.notifier$))
      .subscribe(([user, favoriteOffers]) => {
        this.user.set(user);
        this.favoriteOffers.set(favoriteOffers)
      })
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  private store = inject(Store<{ appStore: AppState }>)
  private route = inject(Router);
  private authService = inject(AuthService);
  private authToggleElementNative: HTMLElement | null = null;
  protected user = signal<User | undefined>(undefined);
  protected favoriteOffers = signal<OfferPreview[] | null>(null);
  private notifier$ = new Subject<void>();

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
    } else if (evt.key === 'Enter' || evt.key === ' ') {
      this.handleLogout(evt)
    }
  }

  private handleLogout(evt: MouseEvent | KeyboardEvent) {
    const target = evt.target as HTMLElement;
    if (target.textContent === 'Log out') {
      this.store.dispatch(logout());
      this.route.navigate([AppRoute.Main])
      this.authService.removeToken();
    }
  }

  navigateToFavorites(evt: MouseEvent): void {
    evt.preventDefault();
    this.route.navigate([AppRoute.Favorites]);
  }
}
