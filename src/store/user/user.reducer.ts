import { AuthorizationStatus } from '../../core/constants/const';
import { createReducer, on } from '@ngrx/store';
import { UserState } from '../../core/models/user-state';
import * as actions from './actions/user.actions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
};

export const userReducer = createReducer(
  initialState,
  on(actions.checkAuthorizationStatus, state => ({
    ...state,
  })),
  on(actions.checkAuthorizationStatusSuccess, (state, { user }) => ({
    ...state,
    user: { ...user },
    authorizationStatus: AuthorizationStatus.Auth,
  })),
  on(actions.checkAuthorizationStatusFailure, state => ({
    ...state,
    authorizationStatus: AuthorizationStatus.NoAuth,
  })),
  on(actions.loginSuccess, (state, { user }) => ({
    ...state,
    user: { ...user },
    authorizationStatus: AuthorizationStatus.Auth,
  })),
  on(actions.loginFailure, state => ({
    ...state,
  })),
  on(actions.logout, state => ({
    ...state,
    user: undefined,
    authorizationStatus: AuthorizationStatus.NoAuth,
  })),
  on(actions.logoutSuccess, state => ({
    ...state,
    user: undefined,
    authorizationStatus: AuthorizationStatus.NoAuth,
  })),
  on(actions.logoutFailure, state => ({
    ...state,
  }))
);
