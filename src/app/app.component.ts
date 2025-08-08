import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {createReducer, on, Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../types/offers';
import {changeCity, loadOffersData} from '../store/app.actions';
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
    this.store.select(state => state).subscribe(s => console.log(s.appStore));
  }

}

export const offersAdapter: EntityAdapter<OfferPreview> = createEntityAdapter<OfferPreview>();

const initialState = {
  offers: offersAdapter.getInitialState(
    {
      isLoading: false,
      error: null,
    }
  ),
  currentCity: {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 10
    }
  }
};

export const appReducer = createReducer(
  initialState,
  on(loadOffersData, (state, {offers}) => ({
    ...state, offers: offersAdapter.setAll(offers, {...state.offers})
  })),
  on(changeCity, (state, {city}) => ({
    ...state, city: city
  }))
);
