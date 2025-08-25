import {AuthorizationStatus} from '../../core/constants/const';
import {createReducer} from '@ngrx/store';

const initialState = {
  user: {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: undefined,
  }
}

export const userReducer = createReducer(
  initialState,
)

