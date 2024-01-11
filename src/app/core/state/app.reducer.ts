import { ActionReducerMap } from '@ngrx/store';

import * as auth from '../../authentication/state/auth.state';
import * as product from '../../apps/products/state/workout.state';
// import * as cart from '../../pages/cart/state/cart.state';

export interface AppState {
  session_data: auth.IAuthState;
  exercises: product.ExerciseState;
  // cart: cart.CartState;
}

export const appReducers: ActionReducerMap<AppState> = {
  session_data: auth.authReducer,
  exercises: product.ExerciseReducer,
  // cart: cart.CartReducer,
};
