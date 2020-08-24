import {AppState} from './swapi.state';
import {createSelector} from "@ngrx/store";

export const _selectSwapi = (appState: AppState) => appState;

export const selectSwapi = createSelector(
  _selectSwapi,
  (state: AppState) => state.state
);
