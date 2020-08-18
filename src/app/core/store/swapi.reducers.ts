import {Action, createReducer, on} from '@ngrx/store';
import * as SwapiActions from './swapi.actions';
import {SwapiState, initializeState} from './swapi.state';

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(SwapiActions.GetFilmAction, state => {
    return {...state, loading: true}
  }),
  on(SwapiActions.SuccessGetFilmAction, (state: SwapiState, {payload}) => {
    return {...state, loading: false, error: null, films: payload};
  }),
  on(SwapiActions.GetCharacterAction, state => {
    return {...state, loading: true};
  }),
  on(SwapiActions.BeginGetCharactersAction, (state: SwapiState, {payload}) => {
    return {...state, loading: true, charactersIds: [], selectedFilm: null};
  }),
  on(SwapiActions.BeginGetCharactersByIdAction, (state: SwapiState, {payload}) => {
    return {...state, loading: true, charactersIds: payload.ids, selectedFilm: payload.selectedFilm};
  }),
  on(SwapiActions.SuccessGetCharacterAction, (state: SwapiState, {payload}) => {
    return {...state, loading: false, error: null, characters: payload};
  }),
  on(SwapiActions.ErrorAction, (state: SwapiState, error: Error) => {
    console.error(error);
    return {...state, loading: false, error: error};
  })
);

export function SwapiReducer(
  state: SwapiState | undefined,
  action: Action
): SwapiState {
  return reducer(state, action);
}
