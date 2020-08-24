import {createAction, props} from '@ngrx/store';
import {Film} from "../../components/shared/model/film";
import {Character} from "../../components/shared/model/character";
import {ApiResponse} from "../../components/shared/model/api.response";

export const BeginGetFilmsAction = createAction('[Film] - Begin Get Films');

export const SuccessGetFilmAction = createAction('[Film] - Success Get Films',
  props<ApiResponse<Film[]>>()
);

export const BeginGetCharactersAction = createAction('[Character] - Begin Get Characters',
  props<{ payload: number }>());

export const BeginGetCharactersByFilmAction = createAction('[Character] - Begin Get Characters By Film',
  props<Film>());

export const SuccessGetCharacterAction = createAction('[Character] - Success Get All Characters',
  props<ApiResponse<Character[]>>()
);

export const ErrorAction = createAction('[Common] - Error',
  props<Error>());
