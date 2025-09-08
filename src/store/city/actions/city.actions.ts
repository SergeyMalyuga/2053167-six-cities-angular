import { createAction, props } from '@ngrx/store';
import { City } from '../../../core/models/city';

export const changeCity = createAction(
  '[Main page component] Change city]',
  props<{ city: City }>()
);
