import {createAction, props} from '@ngrx/store';
import {Film} from "../../components/shared/model/film";
import {Character} from "../../components/shared/model/character";
import {ApiResponse} from "../../components/shared/model/api.response";

export const GetFilmAction = createAction('[Film] - Get Film');

export const BeginGetFilmsAction = createAction('[Film] - Begin Get Films');

export const SuccessGetFilmAction = createAction('[Film] - Success Get Films',
  props<{ payload: Film[] }>()
);

export const GetCharacterAction = createAction('[Character] - Get Characters');

export const BeginGetCharactersAction = createAction('[Character] - Begin Get Characters',
  props<{ payload: number }>());

export const BeginGetCharactersByIdAction = createAction('[Character] - Begin Get Characters By Id',
  props<{ payload: any }>());

export const SuccessGetCharacterAction = createAction('[Character] - Success Get All Characters',
  props<{ payload: ApiResponse<Character[]>}>()
);

export const ErrorAction = createAction('[Common] - Error',
  props<Error>());
