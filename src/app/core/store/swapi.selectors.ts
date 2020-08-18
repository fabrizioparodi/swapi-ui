import {SwapiState} from './swapi.state';
import {createSelector} from "@ngrx/store";

export interface AppState {
  state: SwapiState;
}

export const _selectSwapi = (appState: AppState) => appState;

export const selectSwapi = createSelector(
  _selectSwapi,
  (state: AppState) => state.state
);
