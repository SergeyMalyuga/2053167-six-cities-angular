import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {checkAuthorizationStatus, loadOffersData} from '../store/app.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  constructor(private store: Store<{ appStore: AppState }>) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.store.dispatch(loadOffersData());
    this.store.dispatch(checkAuthorizationStatus());
  }
}

