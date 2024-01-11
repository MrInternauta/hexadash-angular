import { Action, createReducer, on } from '@ngrx/store';

import { loadedPermissions, setUser, unUser } from './auth.actions';
import { Id, Token } from '../../core/models/index';
import { UserDto } from '../model/user.dto';

export interface IAuthState {
  user: UserDto;
  id: Id;
  token: Token;
}

export const initialState: IAuthState = {
  user: null,
  id: null,
  token: null,
};

export const _authReducer = createReducer(
  initialState,
  on(setUser, (state, { user, token, id }) => {
    console.log(state);

    return { ...state, user, token, id };
  }),
  on(unUser, (state) => ({ ...state, user: null, token: null, id: null })),
  on(loadedPermissions, (state, { Permissions }) => ({
    ...state,
    permissions: Permissions,
  }))
);

export function authReducer(state: any, action: Action) {
  return _authReducer(state, action);
}
