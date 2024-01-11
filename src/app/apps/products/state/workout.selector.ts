import {
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector,
} from '@ngrx/store';
import { ExerciseFeatureKey, ExerciseState } from './workout.state';
import { ArticleResponse } from '../models';
import { AppState } from '../../../core/state/app.reducer';

export interface FeatureState {
  counter: number;
}

export const selectExerciseFeature = (state: AppState) => state.exercises;

export const selectListExercise: MemoizedSelector<
  AppState,
  ArticleResponse | null,
  DefaultProjectorFn<any | null>
> = createSelector(
  selectExerciseFeature,
  (state: ExerciseState) => state[ExerciseFeatureKey]
);
