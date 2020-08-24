import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
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
      switchMap(() =>
        this.filmService.getFilms().pipe(
          map((data: ApiResponse<Film[]>) => {
            return SwapiActions.SuccessGetFilmAction(data);
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
      switchMap((action: { payload: number }) =>
        this.characterService.getCharacters(action.payload).pipe(
          map((data: ApiResponse<Character[]>) => {
            return SwapiActions.SuccessGetCharacterAction(data);
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
      ofType(SwapiActions.BeginGetCharactersByFilmAction),
      switchMap((action: Film) => {
          const ids = action.characters.map(f => f.replace(/\D/g, ''));
          return fromPromise(this.characterService.getCharactersByIds(ids)).pipe(
            map((data: Character[]) => {
              return SwapiActions.SuccessGetCharacterAction({
                results: data
              });
            }),
            catchError((error: Error) => {
              return of(SwapiActions.ErrorAction(error));
            })
          )
        }
      )
    )
  );
}
