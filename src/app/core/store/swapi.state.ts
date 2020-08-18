import {Film} from "../../components/shared/model/film";
import {Character} from "../../components/shared/model/character";
import {ApiResponse} from "../../components/shared/model/api.response";

export class SwapiState {
  films: Film[];
  selectedFilm: Film;
  characters: ApiResponse<Character[]>;
  charactersIds: string[];
  error: Error;
  loading: boolean;
}

export const initializeState = (): SwapiState => {
  return {
    films: [],
    selectedFilm: null,
    characters: {
      count: 0,
      previous: null,
      next: null,
      results: []
    },
    charactersIds: [],
    error: null,
    loading: false
  };
};
