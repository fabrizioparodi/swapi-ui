import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import * as SwapiActions from './swapi.actions';
import {FilmService} from "../../components/film/film.service";
import {Film} from "../../components/shared/model/film";
import {Character} from "../../components/shared/model/character";
import {CharacterService} from "../../components/character/character.service";
import {fromPromise} from "rxjs/internal-compatibility";
import {ApiResponse} from "../../components/shared/model/api.response";

@Injectable()
export class SwapiEffects {
  constructor(private action$: Actions,
              private filmService: FilmService,
              private characterService: CharacterService) {
  }

  getFilms: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(SwapiActions.BeginGetFilmsAction),
      mergeMap((action) =>
        this.filmService.getFilms().pipe(
          map((data: Film[]) => {
            return SwapiActions.SuccessGetFilmAction({payload: data});
          }),
          catchError((error: Error) => {
            return of(SwapiActions.ErrorAction(error));
          })
        )
      )
    )
  );

  getCharacters: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(SwapiActions.BeginGetCharactersAction),
      mergeMap((action) =>
        fromPromise(this.characterService.getCharacters(action.payload)).pipe(
          map((data: ApiResponse<Character[]>) => {
            return SwapiActions.SuccessGetCharacterAction({payload: data});
          }),
          catchError((error: Error) => {
            return of(SwapiActions.ErrorAction(error));
          })
        )
      )
    )
  );

  getCharactersById: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(SwapiActions.BeginGetCharactersByIdAction),
      mergeMap((action) =>
        fromPromise(this.characterService.getCharactersByIds(action.payload.ids)).pipe(
          map((data: Character[]) => {
            return SwapiActions.SuccessGetCharacterAction({
              payload: {
                results: data
              }
            });
          }),
          catchError((error: Error) => {
            return of(SwapiActions.ErrorAction(error));
          })
        )
      )
    )
  );
}
