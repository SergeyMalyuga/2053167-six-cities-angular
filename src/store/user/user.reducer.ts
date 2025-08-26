import {AuthorizationStatus} from '../../core/constants/const';
import {createReducer, on} from '@ngrx/store';
import {
  checkAuthorizationStatus,
  checkAuthorizationStatusFailure,
  checkAuthorizationStatusSuccess, loginFailure, loginSuccess, logout, logoutFailure, logoutSuccess
} from '../app/app.actions';
import {UserState} from '../../core/models/user-state';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
}

export const userReducer = createReducer(
  initialState,
  on(checkAuthorizationStatus, (state) => ({
    ...state
  })),
  on(checkAuthorizationStatusSuccess, (state, {user}) => ({
    ...state, user, authorizationStatus: AuthorizationStatus.Auth
  })),
  on(checkAuthorizationStatusFailure, (state) => ({
    ...state, authorizationStatus: AuthorizationStatus.NoAuth
  })),
  on(loginSuccess, (state, {user}) => ({
    ...state, user, authorizationStatus: AuthorizationStatus.Auth
  })),
  on(loginFailure, (state) => ({
    ...state
  })),
  on(logout, (state) => ({
    ...state, user: undefined, authorizationStatus: AuthorizationStatus.NoAuth
  })),
  on(logoutSuccess, (state) => ({
    ...state, user: undefined, authorizationStatus: AuthorizationStatus.NoAuth
  })),
  on(logoutFailure, (state) => ({
    ...state
  })),
)

