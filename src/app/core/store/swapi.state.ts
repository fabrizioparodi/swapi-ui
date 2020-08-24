import {Film} from "../../components/shared/model/film";
import {Character} from "../../components/shared/model/character";
import {ApiResponse} from "../../components/shared/model/api.response";

export interface AppState {
  state: SwapiState;
}

export interface SwapiState {
  films: Film[];
  selectedFilm: Film;
  characters: ApiResponse<Character[]>;
  error: Error;
  loading: boolean;
}

export const initialState: SwapiState = {
  films: [],
  selectedFilm: null,
  characters: {
    count: 0,
    previous: null,
    next: null,
    results: []
  },
  error: null,
  loading: false
};
