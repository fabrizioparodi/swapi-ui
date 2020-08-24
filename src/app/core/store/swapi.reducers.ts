import {Action, createReducer, on} from '@ngrx/store';
import * as SwapiActions from './swapi.actions';
import {initialState, SwapiState} from './swapi.state';
import {Film} from "../../components/shared/model/film";
import {Character} from "../../components/shared/model/character";
import {ApiResponse} from "../../components/shared/model/api.response";

const reducer = createReducer(
  initialState,
  on(SwapiActions.BeginGetFilmsAction, (state: SwapiState) => {
    return {...state, loading: true}
  }),
  on(SwapiActions.SuccessGetFilmAction, (state: SwapiState, payload: ApiResponse<Film[]>) => {
    return {...state, loading: false, error: null, films: payload.results};
  }),
  on(SwapiActions.BeginGetCharactersAction, (state: SwapiState, {payload}) => {
    return {...state, loading: true, selectedFilm: null};
  }),
  on(SwapiActions.BeginGetCharactersByFilmAction, (state: SwapiState, payload: Film) => {
    return {...state, loading: true, selectedFilm: payload};
  }),
  on(SwapiActions.SuccessGetCharacterAction, (state: SwapiState, payload: ApiResponse<Character[]>) => {
    return {...state, loading: false, error: null, characters: payload};
  }),
  on(SwapiActions.ErrorAction, (state: SwapiState, error: Error) => {
    console.error(error);
    return {...state, loading: false, error: error};
  })
);

export function SwapiReducer(
  state: SwapiState,
  action: Action
): SwapiState {
  return reducer(state, action);
}
