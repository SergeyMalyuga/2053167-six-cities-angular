import { createAction, props } from '@ngrx/store';
import { User } from '../../../core/models/user';

export const logout = createAction('[Header component] Logout');
export const logoutSuccess = createAction('[Header component] Logout Success');
export const logoutFailure = createAction('[Header component] Logout Failure');
export const checkAuthorizationStatus = createAction(
  '[Main page component] Check authorization status'
);
export const checkAuthorizationStatusSuccess = createAction(
  '[Main page component] Check authorization status successfully',
  props<{
    user: User;
  }>()
);
export const checkAuthorizationStatusFailure = createAction(
  '[Main page component] Check authorization status failure'
);

export const loginAction = createAction(
  '[Login page component] Login action',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Login page component] Login Successfully',
  props<{ user: User }>()
);
export const loginFailure = createAction(
  '[Login page component] Login failure'
);
