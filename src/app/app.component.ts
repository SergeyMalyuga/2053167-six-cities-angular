import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {loadOffersData} from '../store/app.actions';
import {offers} from '../mocks/offers';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private store: Store<{ appStore: AppState }>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadOffersData({offers}));
  }
}

